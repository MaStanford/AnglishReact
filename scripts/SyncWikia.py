__author__ = 'm.stanford'

import string
from socket import error as SocketError
import json, httplib

STARTING_PAGE = 72;
ENDING_PAGE = 98;

invalidWords = ["un-English", "Anglish/English", "attested", "unattested", "Class"]
delimiter = "\'\'\'"
wierdfunkInSomeWords = ["\'\' \'\'\'", "\'\'\',", '\'\'\'\'\'', '\"\'\'']


def getWordPage(page):
    connection = httplib.HTTPConnection('anglish.wikia.com', 80)
    connection.connect()
    connection.request('GET', '/api.php?action=query&prop=revisions&rvprop=content&format=json&pageids=' + str(page))
    result = json.loads(connection.getresponse().read())
    print result
    return result

def processRawPage(page, number):
    words = page['query']
    words = words['pages']
    words = words[str(number)]
    words = words['revisions']

    words = words[0]

    listOfWords = []

    for key, value in words.iteritems():

        listOfLines = value

        for strings in wierdfunkInSomeWords:
            listOfLines = listOfLines.replace(strings, '')

        listOfLines = value.split(delimiter)

        print 'Raw Line: ' + str(listOfLines)

        length = len(listOfLines)

        i = 10;

        while not isValidWord(listOfLines[i]):
            i += 1

        even = i % 2
        while i < length:
            #Check if we have an invalid word in a place where it should be valid.  We then will append that line to the previous line in the list of words.
            if not isValidWord(listOfLines[i]) and i % 2 == even:

                out = listOfWords[len(listOfWords)-1] + listOfLines[i]
                out = out.replace("\'\'", '').replace('|', '\n')
                listOfWords.remove(listOfWords[len(listOfWords)-1])
                listOfWords.append(out)
                print 'Found odd line: ' + out.replace('\n', '  ')
                i += 1
                even = i % 2
            else:
                print 'Valid Line: ' + listOfLines[i].replace("\'\'", '').replace('|', '').replace('\n', '  ')
                listOfWords.append(listOfLines[i].replace("\'\'", '').replace('|', '\n'))
                i += 1

    return listOfWords


def buildWordDef(processedHead, processedDef):

    word = {}

    word['word'] = processedHead.lower()

    listOfDefs = [x for x in processedDef.split('\n') if x]

    # print 'Def: ' + processedHead + ' : ' + str(listOfDefs)

    if len(listOfDefs) > 3:
        word['attested_definitions'] = listOfDefs[1].replace('-\n', '').replace('\n', '').replace(' ', '').split(',')
        word['unattested_definitions'] = listOfDefs[2].replace('-\n', '').replace('\n', '').replace(' ', '').split(',')
        word['type'] = listOfDefs[0].replace("\'", "")
    else:
        word['attested_definitions'] = []
        word['unattested_definitions'] = []
        word['type'] = ''

    print "buildWordDef" + str(word)

    return word


def addWord(wordDef):

    word = wordDef['word']
    attested = wordDef['attested_definitions']
    unattested = wordDef['unattested_definitions']
    wordType = wordDef['type']

    try:
        connection = httplib.HTTPSConnection('https://anglishwordbook.herokuapp.com/', 443)
        connection.connect()
        connection.request('POST', '/1/classes/Word', json.dumps({
            "Word": word,
            "Attested": attested,
            "Unattested": unattested,
            "Type": wordType
        }), {
           "X-Parse-Application-Id": "ApuxkukQC9mFuLIdIjG3qC27ms5kZ4XZbopxUohp",
           "X-Parse-Master-Key ": "ME6doa9GdB2PTGesScr8DwNQVzlzMwmoEurf3kIX",
           "Content-Type": "application/json"
        })
        result = json.loads(connection.getresponse().read())

        if 'objectId' in result:
            print result
            return True
        else:
            return False

    except SocketError as e:
        return addWord(wordDef)



def isValidWord(line):

    if len(line.split(' ')) > 2:
        return False

    if line in invalidWords:
        return False

    if all(c in string.punctuation for c in line.replace(' ', '').replace('\n','')):
        return False

    return True

for j in range(STARTING_PAGE, ENDING_PAGE):
    rawPage = getWordPage(j)
    processedPage = processRawPage(rawPage, j)

    index = len(processedPage)
    k = 0
    while k < index - 1:
        # print 'Obj 1 ' + processedPage[i]
        # print 'Obj 2 ' + processedPage[i+1]
        wordDef = buildWordDef(processedPage[k], processedPage[k+1])
        if addWord(wordDef):
            k += 2
        else:
            k = k

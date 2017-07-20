__author__ = 'm.stanford'

__author__ = 'm.stanford'

import string

import json, httplib

nameheader = 'Naming Words'
pageheader = 'Page'
maleheader = 'Male Names'
femaleheader = 'Female Names'
flushline = ' . '
lines = []

wordType = ['NameWord', 'FemaleName', 'MaleName']

section = wordType[0]

servers = dict()
servers['local'] = ['localhost','3000']
servers['remote'] = ['anglish-server.herokuapp.com','80']

server = servers['local']

def addWord(wordDef):
    connection = httplib.HTTPConnection(server[0], server[1])
    connection.connect()
    connection.request('POST', 'api/names', json.dumps(wordDef))
    result = json.loads(connection.getresponse().read())
    print result


def processNameWords(lines):
    pieces = []
    words = {}
    ne = ''
    oe = ''
    meaning = ''
    pronounce = ''

    if len(lines) > 2:
        print 'Lines: ' + str(lines)
        pieces = lines[0].split('.')[1].split(' ')
        oe = pieces[1]
        pronounce = pieces[2]
        meaning += str(pieces[3:])
        pieces = lines[1].split(' ')
        ne = pieces[0]
        meaning += str(pieces[1:])
    else:
        print 'Lines: ' + str(lines)
        pieces = lines[0].split('.')[1].split(' ')
        oe = pieces[1]
        pronounce = pieces[2]
        meaning += str(pieces[3:])
        ne = lines[1]

    words['ne'] = ne
    words['oe'] = oe
    words['meaning'] = meaning
    words['extra'] = pronounce

    print 'Word: ' + str(words)

    addWord(words, wordType[0])

def processFemaleWords(lines):
    pieces = []
    words = {}
    name = ''
    breakdown = ''
    explain = ''

    if not lines:
        return

    if len(lines) > 2:
        print 'Lines: ' + str(lines)
        pieces = lines[0].split('.')[1].split(' ')
        name = pieces[1]
        breakdown = pieces[2:]
        explain += lines[1]
        explain += lines[2]
    else:
        print 'Lines: ' + str(lines)
        pieces = lines[0].split('.')[1].split(' ')
        name = pieces[1]
        breakdown = pieces[2:]
        explain += lines[1]

    words['ne'] = name
    words['oe'] = name
    words['meaning'] = explain
    words['extra'] = breakdown

    print 'Word: ' + str(words)

    addWord(words)

def processMaleWords(lines):
    pieces = []
    words = {}
    name = ''
    breakdown = ''
    explain = ''

    if not lines:
        return

    if len(lines) > 2:
        print 'Lines: ' + str(lines)
        pieces = lines[0].split('.')[1].split(' ')
        name = pieces[1]
        breakdown = pieces[2:]
        explain += lines[1]
        explain += lines[2]
    else:
        print 'Lines: ' + str(lines)
        pieces = lines[0].split('.')[1].split(' ')
        name = pieces[1]
        breakdown = pieces[2:]
        explain += lines[1]

    words['ne'] = name
    words['oe'] = name
    words['meaning'] = explain
    words['extra'] = breakdown

    print 'Word: ' + str(words)

    addWord(words)




def isNumInLine(line):
    if line.split('.')[0].isdigit():
        return True
    return False


f = open('./NamingWords.txt', 'r')
i = 0
for line in f:
    if pageheader in line:
        continue

    if nameheader in line:
        section = wordType[0]
        continue

    if maleheader in line:
        section = wordType[2]
        continue

    if femaleheader in line:
        section = wordType[1]
        continue

    if section is wordType[0]:
        if isNumInLine(line):
            if i > 0:
                processNameWords(lines)
                lines = []
                i = 0
                lines.append(line)
            else:
                lines.append(line)
        else:
            lines.append(line)

    if section is wordType[1]:
        if isNumInLine(line):
            if i > 0:
                processFemaleWords(lines)
                lines = []
                i = 0
                lines.append(line)
            else:
                lines.append(line)
        else:
            lines.append(line)

    if section is wordType[2]:
        if isNumInLine(line):
            if i > 0:
                processMaleWords(lines)
                lines = []
                i = 0
                lines.append(line)
            else:
                lines.append(line)
        else:
            lines.append(line)

    i += 1
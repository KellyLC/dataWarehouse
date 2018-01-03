with open('/Users/apple/Desktop/sales/src/js/Actor.json','w') as fout:
    fout.write('{ "actor" : \n[')
    with open('/Users/apple/Desktop/sales/src/js/Actor.js') as fin:
# with open('/Users/apple/Desktop/sales/src/js/Movie1.js','w') as fout:
#     with open('/Users/apple/Desktop/sales/src/js/Movie.js') as fin:

        # result = []
        # for line in fin.readlines():
        #     line = line.replace('},', '},\n')
        #     result.append(line)

        result = []
        for line in fin.readlines():
            if(len(line) == 0):
                continue
            data = line.strip().split(',', 1)
            name = data[0].split(':')
            name[1] = name[1].strip()
            name[1] = name[1].strip('\'')
            name[1] = name[1].replace("\"", "\'")

            newName = name[0] + ':\"' + name[1] + "\""
            result.append(newName + ',' + data[1] + '\n')

    fout.write('{0}'.format(' '.join(result)) + ']}')
    # fout.write('{0}'.format(' '.join(result)))

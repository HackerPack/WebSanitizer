reader = open('bad_words.js','rb')

with open('bad_words2.js','w+') as writer:
	for line in reader:
		#last_pos = fp.tell()
		#line = reader.readline()
		#fp.seek(last_pos)
		newline = '"' + line.strip('\n') + '",'
		writer.write(newline+'\n')
	


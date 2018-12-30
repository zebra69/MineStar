# -*- coding: utf-8 -*-
import csv
#import matplotlib.pyplot as plt

def read_stardata(filename):
    csv_file = open('star.csv','r')
    f = csv.reader(csv_file, delimiter=",", doublequote=True, lineterminator="\r\n", quotechar='"', skipinitialspace=True)
    header = next(f)
    #print(header)
    a_result = []
    b_result = []
    for row in f:
        number = int(row[0])
        ra_hour = float(row[1])
        ra_min = float(row[2])
        ra_sec = float(row[3])
        sign = int(row[4])
        dec_deg = float(row[5])
        dec_min = float(row[6])
        dec_sec = float(row[7])
        mag = float(row[8])
        #print(row)
        A = ra_hour*15 + ra_min/60*15 + (ra_sec/3600)*15
        B = dec_deg + dec_min/60 + dec_sec/3600
        if (sign == 0):
            B *= -1
            obj={}
            #obj["hipid"] = number
            obj["mag"] = mag
            #obj["ra"] = A
            #obj["dec"] = B
        if mag < 5.5:
            a_result.append(A)
            b_result.append(B)
    return a_result,b_result
#print(len(result))
#for i in result:
#    print(i)
#plt.plot(range(0,10),df['num2'],marker="o")
#plt.show()

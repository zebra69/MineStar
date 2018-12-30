from scan import read_stardata
from make_star import make_star
import cv2
import matplotlib.pyplot as plt
import numpy as np
#星のデータの読み込み
x,y = read_stardata('star.csv')
#fig = plt.figure()

#ax = fig.add_subplot(1,1,1)

#ax.scatter(x,y)
#cv2.line(ax, (x, y), (x, y), (255, 0, 0))
#ax.set_title('first scatter plot')
#ax.set_xlabel('x')
#ax.set_ylabel('y')
#plt.savefig("foo.png")
w, h = 500, 1000
mask = np.zeros((w, h), dtype=np.uint8)
img = make_star(x,y,mask)

cv2.imwrite("mask.png", img)

#fig.show()

import cv2
import numpy as np

def make_star(point_x,point_y,img):
    #img = np.full((210, 425, 3), 128, dtype=np.uint8)
    #print(len(point_x))
    #print(len(point_y))
    for i in range(0,len(point_x)):
        cv2.circle(img, (int(point_x[i]*10), int(point_y[i]*10)), 1, (255, 0, 0), thickness=1)
    return img

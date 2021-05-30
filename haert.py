# -*- coding: utf-8 -*-
"""
Created on Sat May 29 18:33:33 2021

@author: Andrew
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import glob 
import moviepy.editor as mpy

addresses = pd.read_csv(r'C:/Users/Andrew/OneDrive - nyu.edu/Documents/Python Script Backup/datasets/random_address.csv',index_col=0)["0"]

'''start from 100 pixel sprites'''
def generate_icon(address):
    address = address[-25:]
    SIZE = 5
    icon = np.zeros((SIZE,SIZE))
    
    #choosing a random number between 0 and 1 that is not close to 0.5
    slider = np.random.rand()
    if slider > 0.5:
        color = np.random.randint(0,35)/100
    else: 
        color = np.random.randint(65,100)/100
        
    #selecting pixels to fill in 
    for i in np.arange(SIZE):
        for j in np.arange(SIZE):
            if int(address[i+j], 16) % 2 == 0:
                icon[i,j] = color
            else: 
                icon[i,j] = 0.5
                
    #making symmetric matrix
    icon_v = np.flip(icon, axis=1)
    icon[:,3]=icon_v[:,3]
    icon[:,4]=icon_v[:,4]
    return icon

icons = []
for address in addresses:
    icon = generate_icon(address)
    icons.append(icon)

data = np.zeros((60, 60)) + 0.5 #plus 0.5 for colormap    
index=0
for i in np.arange(0,60,step=6):
    for j in np.arange(0,60,step=6):
        data[i:i+5,j:j+5] = icons[index]
        index+=1

'''create a recursive scattering algorithm that groups the points into a circle'''
def scatter(tempdata, threshold, overlap):
    # points_moved = 0
    size_x = tempdata.shape[0]
    size_y = tempdata.shape[1]
    for x in np.arange(size_x):
        for y in np.arange(size_y):
            if tempdata[x,y]!=0.5 and np.random.rand() < threshold:
                # print("selected, ", x,y)
                tempdata[shift_closer(x,y,tempdata,1,overlap)] = tempdata[x,y] #set new position
                tempdata[x,y] = 0.5 #set old positions to blank
                # points_moved+=1
    # print("points moved: ", points_moved)
    return tempdata
    
def shift_closer(x,y,tempdata,stepsize,overlap):
    origin = np.array([30,30])
    old_distance = 10000
    target = x,y
    for i in np.arange(max(0,x-stepsize),min(x+stepsize+1,60)):
        for j in np.arange(max(0,y-stepsize),min(y+stepsize+1,60)):
            if tempdata[i,j]==0.5 or overlap==True:
                point = np.array([i,j])
                new_distance = np.sqrt(((point[0]-origin[0])**2)+((point[1]-origin[1])**2))
                if new_distance < old_distance:
                    target = i,j
                    old_distance=new_distance
    return target

#make it pulse based on synchrony between chain IDs?

#recursive plot
def plot_movement(tempdata,threshold,rounds,current_round):
    if current_round < rounds:
        if current_round > 70:
            tempdata = scatter(tempdata.copy(),threshold, True)
        else:
            tempdata = scatter(tempdata.copy(),threshold, False)
        fig, ax = plt.subplots(figsize=(6,6))
        plt.imshow(tempdata, cmap = "Spectral")
        ax.set_xlim(0,60)
        ax.set_ylim(0,60)
        plt.axis('off')
        plt.show()
        fig.savefig(r"C:\Users\Andrew\OneDrive - nyu.edu\Documents\Python Script Backup\datasets\genart\haert\round_{}.png".format(current_round), quality = 85)
        plot_movement(tempdata,threshold,rounds,current_round+1)
    return 

#start filming
fig, ax = plt.subplots(figsize=(6,6))
ax.set_xlim(0,60)
ax.set_ylim(0,60)
plt.imshow(data, cmap = "Spectral")
plt.axis('off')

#first half two seconds of no change
for image_start in np.arange(10): 
    fig.savefig(r"C:\Users\Andrew\OneDrive - nyu.edu\Documents\Python Script Backup\datasets\genart\haert\round_0{}.png".format(image_start), quality = 85)
figures = plot_movement(data,0.5,110,10)

gif_name = 'haert'
fps = 8
file_list = glob.glob(r"C:\Users\Andrew\OneDrive - nyu.edu\Documents\Python Script Backup\datasets\genart\haert\*")
file_list.extend(file_list[::-1]) #create reverse gif too EDIT: wtf this reverse the actual file not just the filepath???
clip = mpy.ImageSequenceClip(file_list, fps=fps)
clip.write_gif(r"C:\Users\Andrew\OneDrive - nyu.edu\Documents\Python Script Backup\datasets\genart\haert\{}.gif".format(gif_name), fps=fps)



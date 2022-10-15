# How to code in Python - e.p 4 - graphics with turtle!
So I'm back again with yet another python tutorial, but I've got a few non-python blog posts planned, so stay tuned!
You should have already completed episode [1](https://thedailygobo.scratchtools.app/post/143), [2](https://thedailygobo.scratchtools.app/post/186) and [3](https://thedailygobo.scratchtools.app/post/251/).
## What is turtle?
I presume you are all used to the graphics Scratch gives you, and it might have been a bit annoying when you found out you could only print text and see what the user types in python. Well now, were going to use a graphics library called "turtle"!

ㅤ

First let's clear up what a library is in programming. A library is just like a extension in scratch, but instead of new blocks added, new functions and variables are added. Turtle is a beginners graphics library that makes it easy to move a "turtle" around the screen, and it will draw a line behind it! So let's get started!
## Drawing a square
Of course, we have to start with something easy but boring, so let's draw a square. Open a new file, but DO NOT call it turtle.py. That will cause lots of weird errors. Type the code below into it:
```
import turtle
```
This imports the turtle library, like you can click on a scratch extension to add it to your project.
```
screen = turtle.getscreen()
t = turtle.Turtle()
```
These just set up a window, and create a turtle for you to use to draw on the window. Now let's just make it draw a line!
```
t.forward(50)
turtle.done()
```
The first command draws a line, and the second command keeps the window open until you close it.
## Conclusion
If you had any trouble with this tutorial, make sure to ask me on scratch [@applejuiceproduc](https://scratch.mit.edu/users/applejuiceproduc). I know myself that I had quite a lot of issues with this tutorial, and it wasn't because of the code. I even ended up having to run it on a different computer! Unfortunately, I had to cut this tutorial short because I didn't have much time, but come on, give it a love and a fave anyway :) I might not be able to post anything this evening, but we'll see. Have a good day!
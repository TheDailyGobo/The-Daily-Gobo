# How to code in Python - e.p 3
Welcome back to how to code in Python, today were going to be doing some actually coding! I assume you have already completed parts [1](https://thedailygobo.scratchtools.app/post/143) and [2](https://thedailygobo.scratchtools.app/post/186), and you know what to do when I say "run the file" or "open a new file". If not, re-read episode 2 or contact me on scratch [@applejuiceproduc](https://scratch.mit.edu/users/applejuiceproduc).
## Making a command line calculator
Let's face it. Coding stuff that does exactly the same, expected thing every time is a bit boring, so lets make something interactive!

ㅤ


Make a new file called "calculator.py". Now enter the code below in it:
```
operator = input("Enter +, -, * or /. ")
```
There are a lot of new things here. operator is a variable. You make a variable by typing the variable name, then =, then it's value. Next we have the build-in input() function. It acts just like "ask" in scratch. In most programming languages, but not scratch, functions can "return" a value. This means, that just like when you see a variable, you know it's a value, when you see a function, it has a value too. In this case, the value is whatever the user puts in. Now for the next 2 lines.
```
number1 = int(input("Enter your first number. "))
number2 = int(input("Enter your second number. "))
```
This does the same thing as the first line of the code, except the int() function turns the input from a string (letters, numbers and symbols) into a integer (whole numbers). 
```
if operator == "+":
    print(number1 + number2)
elif operator == "-":
    print(number1 - number2)
elif operator == "*":
    print(number1 * number2)
elif operator == "/":
    print(number1 / number2)
```
These lines of code check if the operator is a +, -, * or /, and then prints out the result based on that. There are two things to note here.
1. The use of 2 ='s. You use two equal signs beside each other instead of one, because a single equal sign already has a role, it's used for setting variables.
2. The space before print(). When your inside a loop or control flow (like if) statement, you leave a 4 space gap before your line of code. If you were inside two control flow statements/loops, you would use 8 spaces and so on.

Now try running your file, and see if it works. Good luck!

## Conclusion
As always, I hope you find this tutorial easy to follow, and like and fave if you enjoyed so more people can see this, and learn from it. Next python tutorial, I'll be helping you to code more with fun mini projects. Also, I'm collecting up stats about the daily gobo, so stay tuned for that post. See you next time!
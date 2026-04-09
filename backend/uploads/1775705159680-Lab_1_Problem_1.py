import numpy as np
import matplotlib.pyplot as plt

def loss(x,y):
    return (2*x+y-4)**2+(x+2*y-5)**2

def derivatives(x,y):
    dx = 2*(2*x+y-4)*2 + 2*(x+2*y-5)*1
    dy = 2*(2*x+y-4)*1 + 2*(x+2*y-5)*2
    return dx, dy

def gradient_descent(learning_rate, epochs=20):
    x, y = 0.0, 0.0
    error, trajectory = [], []
    for i in range(epochs):
        loss_function = loss(x,y)
        error.append(loss_function)
        trajectory.append((x,y))
        dx, dy = derivatives(x,y)
        x = x - learning_rate*dx
        y = y - learning_rate*dy
    return error, np.array(trajectory)

if __name__ == "__main__":
    learning_rates = [0.01, 0.1, 0.5]
    learning_rates=[0.5]
    
    for lr in learning_rates:
        error, trajectory = gradient_descent(lr, epochs=3)
        plt.plot(error, label=f"LR = {lr}")
        plt.xlabel("Epochs")
        plt.ylabel("Error")
        plt.title("Epoch vs Error")
        plt.legend()
        plt.show()
        print(error[-1])

    for lr in learning_rates:
        error, trajectory = gradient_descent(lr, epochs=3)
        xval, yval = trajectory[:,0], trajectory[:,1]
        plt.plot(xval, yval, marker='s', label=f"LR = {lr}")
        plt.xlabel("x trajectory")
        plt.ylabel("y trajectory")
        plt.title("x and y trajectory")
        plt.legend()
        plt.show()   
        print(xval[-1],yval[-1])
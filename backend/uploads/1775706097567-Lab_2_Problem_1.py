import numpy as np
import matplotlib.pyplot as plt

def step(i):
    return 1 if i >= 0 else 0

def training_perceptron(x, y, bias, epochs, learning_rate=0.1):
    w = np.random.randn(2)
    b = bias
    for _ in range(epochs):
        for i in range(len(x)):
            y_pred = step(np.dot(x[i], w) + b)
            error = y[i] - y_pred
            w += learning_rate * error * x[i]
    return w, b

def plotting(x, y, w, b, title, plot_line=True):
    for i in range(len(y)):
        color = 'blue' if y[i]==1 else 'red'
        plt.scatter(x[i][0], x[i][1], color=color)
    if plot_line:
        x1 = np.linspace(-0.5, 1.5, 10)
        x2 = -(w[0]*x1 + b)/w[1]
        plt.plot(x1, x2, color='green')
    plt.title(title)
    plt.xlabel("x1")
    plt.ylabel("x2")
    plt.show()
    print(w)

if __name__ == "__main__":
    x = np.array([[0,0],[0,1],[1,0],[1,1]])
    and_output = np.array([0,0,0,1])
    or_output = np.array([0,1,1,1])
    xor_output = np.array([0,1,1,0])
    
    bias = -0.5
    
    w_and, b_and = training_perceptron(x, and_output, bias, epochs=50)
    w_or, b_or = training_perceptron(x, or_output, bias, epochs=50)
    w_xor, b_xor = training_perceptron(x, xor_output, bias, epochs=50)
    
    plotting(x, and_output, w_and, b_and, "AND Gate")
    plotting(x, or_output, w_or, b_or, "OR Gate")
    plotting(x, xor_output, w_xor, b_xor, "XOR Gate")

import numpy as np
import matplotlib.pyplot as plt
np.random.seed(42)
X = np.random.normal(-1, 1, (100, 2)) 
true_a, true_b = 2, 3
z = true_a * X[:, 0] + true_b * X[:, 1]

def gradient_descent(X, z, lr=0.1, epochs=200):
    w = np.random.randn(2)
    errors = []
    trajectory = [w.copy()]
    for _ in range(epochs):
        z_pred = X @ w
        error = np.mean((z - z_pred) ** 2)
        errors.append(error)
        grad = -2 * X.T @ (z - z_pred) / len(z)
        w -= lr * grad
        trajectory.append(w.copy())
    return w, errors, np.array(trajectory)

learning_rates = [0.01]
results = {}
for lr in learning_rates:
    w, errors, traj = gradient_descent(X, z, lr=lr, epochs=200)
    results[lr] = (w, errors, traj)
    print(f"LR={lr}, Learned Weights: a={w[0]:.4f}, b={w[1]:.4f}")
 
plt.figure(figsize=(12, 5))
for lr, (w, errors, traj) in results.items():
    plt.plot(errors, label=f"lr={lr}")
plt.xlabel("Epochs")
plt.ylabel("Mean Squared Error")
plt.title("Epoch vs Error")
plt.legend()
plt.show()
plt.figure(figsize=(6, 6))
for lr, (w, errors, traj) in results.items():
    plt.plot(traj[:, 0], traj[:, 1], marker="o", markersize=2, label=f"lr={lr}")
    plt.scatter(traj[0, 0], traj[0, 1], color="red", marker="x", label=f"Start (lr={lr})")
    plt.scatter(true_a, true_b, color="green", marker="*", s=150, label="True (2,3)")
plt.xlabel("a (coefficient for x)")
plt.ylabel("b (coefficient for y)")
plt.title("Trajectory of (a, b) during Training")
plt.legend()
plt.grid()
plt.show()

<?php
// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Platform</title>
    <style>
        :root {
            --primary-color: #3498db;
            --secondary-color: #2ecc71;
            --dark-color: #2c3e50;
            --light-color: #ecf0f1;
            --danger-color: #e74c3c;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        body {
            background: linear-gradient(135deg, var(--light-color), #fff);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            color: var(--dark-color);
        }
        header {
            background-color: var(--dark-color);
            color: white;
            padding: 1rem 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 2rem;
            flex: 1;
        }
        .hero {
            text-align: center;
            padding: 4rem 0;
        }
        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        .hero p {
            font-size: 1.2rem;
            max-width: 800px;
            margin: 0 auto 2rem;
            line-height: 1.6;
        }
        .cta-button {
            display: inline-block;
            background-color: var(--primary-color);
            color: white;
            padding: 0.8rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }
        .cta-button:hover {
            background-color: #2980b9;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin: 4rem 0;
        }
        .feature-card {
            background-color: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            transition: transform 0.3s ease;
        }
        .feature-card:hover {
            transform: translateY(-10px);
        }
        .feature-card h3 {
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        footer {
            background-color: var(--dark-color);
            color: white;
            text-align: center;
            padding: 2rem;
            margin-top: auto;
        }
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>MyAuthSystem</h1>
    </header>
    <div class="container">
        <section class="hero">
            <h1>Welcome to Our Authentication System</h1>
            <p>A secure and reliable platform for user management and authentication. Get started by accessing the admin panel or learn more about our features below.</p>
            <?php if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in']): ?>
                <a href="admin/admin_panel.php" class="cta-button">Go to Admin Panel</a>
            <?php else: ?>
                <button id="adminLoginBtn" class="cta-button">Admin Login</button>
            <?php endif; ?>
        </section>
        <section class="features">
            <div class="feature-card">
                <h3>Secure Authentication</h3>
                <p>Our system provides robust security measures to protect user data and ensure safe access to your resources.</p>
            </div>
            <div class="feature-card">
                <h3>User Management</h3>
                <p>Easily manage user accounts, permissions, and profiles through our intuitive admin interface.</p>
            </div>
            <div class="feature-card">
                <h3>React Integration</h3>
                <p>Seamless integration with React frontend applications through our API endpoints.</p>
            </div>
        </section>
    </div>
    <footer>
        <p>© <?php echo date('Y'); ?> MyAuthSystem. All rights reserved.</p>
    </footer>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const adminLoginBtn = document.getElementById('adminLoginBtn');
            if (adminLoginBtn) {
                adminLoginBtn.addEventListener('click', function() {
                    window.location.href = 'admin/form.php';
                });
            }
            const featureCards = document.querySelectorAll('.feature-card');
            const animateOnScroll = () => {
                featureCards.forEach(card => {
                    const cardPosition = card.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    if (cardPosition < screenPosition) {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }
                });
            };
            featureCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.6s ease';
            });
            animateOnScroll();
            window.addEventListener('scroll', animateOnScroll);
        });
    </script>
</body>
</html>
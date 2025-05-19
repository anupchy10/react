// Example: Adding a profile page
// 1. Create src/pages/Profile.jsx
function Profile() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    return (
      <div>
        <h2>Your Profile</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
    );
  }
  
  <Route path="/profile" element={<Profile />} />
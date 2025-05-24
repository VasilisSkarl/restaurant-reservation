import axios from 'axios';

const backendUrl = 'http://localhost:5000'; // Αντικατέστησε με το URL του backend σου

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${backendUrl}/register`, userData);
    console.log('Εγγραφή χρήστη:', response.data);
    // Μπορείς να αποθηκεύσεις το JWT token εδώ αν επιστραφεί
  } catch (error) {
    console.error('Σφάλμα κατά την εγγραφή:', error.response);
  }
};

// Δημιουργία του χρήστη
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
};

registerUser(userData);

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else if (results.length > 0) {
        const match = await bcrypt.compare(password, results[0].password);
  
        if (match) {
          res.status(200).send('Login successful');
        } else {
          res.status(401).send('Invalid credentials');
        }
      } else {
        res.status(401).send('Invalid credentials');
      }
    });
  });
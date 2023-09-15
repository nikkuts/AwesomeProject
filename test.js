const userA = {
    name: 'Mango',
    age: 5,
  };
  
  const userB = {
    ...userA,
    age: 10,
    happy: true,
  };
  
  console.log(userB);
export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const getUsersById = (userId) => {
  return fetch(`http://localhost:8088/users?id=${userId}`).then((res) =>
    res.json()
  );
};

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const updateUserProfile = (updatedProfileForm) => {
  console.log("You have successfully update your profile!")
  // console.log("Updated Profile: ", updatedProfileForm)

  return fetch(`http://localhost:8088/users/${updatedProfileForm.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedProfileForm)
  })
}

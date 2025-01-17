import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateUserProfile } from "../../services/userService";

export const ProfileForm = () => {
  const [authorName, setAuthorName] = useState("");
  const [authorCohort, setAuthorCohort] = useState(0);
  const navigate = useNavigate()
  const location = useLocation();
  const { userId } = useParams();

  //   console.log(location.state);

  useEffect(() => {
    setAuthorName(location.state?.profile.name);
    setAuthorCohort(location.state?.profile.cohort);
  }, [location]);

  const handleUpdateProfile = () => {
      const updateProfileForm = {
          id: userId,
          name: authorName,
          email: location.state.profile.email,
          cohort: authorCohort
        }
        //console.log(updateProfileForm)
        updateUserProfile(updateProfileForm).then(navigate("/profile"))
        //.then(navigate("/profile"))
    };
    // console.log(authorName)
    // console.log(authorCohort)

  return (
    <>
      <form>
        <h1>Edit Your Profile</h1>
        <fieldset>
          <label>Name:</label>
          <input
            type="text"
            value={authorName}
            onChange={(event) => setAuthorName(event.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>Cohort:</label>
          <input
            type="number"
            value={authorCohort}
            onChange={(event) => setAuthorCohort(event.target.value)}
          />
        </fieldset>
        <button
          onClick={(event) => {
            event.preventDefault()
            handleUpdateProfile();
          }}
        >
          Update Your Profile
        </button>
      </form>
    </>
  );
};

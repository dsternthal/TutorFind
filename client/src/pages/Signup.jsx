import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isStudent, setIsStudent] = useState();
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);
  const handleClick = (event) => {
    const buttonText = event.target.textContent
    console.log(buttonText)
    if (buttonText === "Student") {
      setIsStudent("true")
    }
    else if (buttonText === "Tutor") {
      setIsStudent("false")
    }
  }
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <div class="ui buttons"><button onClick={handleClick} class="ui button">Student</button><div class="or"></div><button onClick={handleClick} class="ui positive button">Tutor</button></div>
          {isStudent ? (<> <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
            <div className="card-body">
              {data ? (
                <p>
                  Success! You may now head{' '}
                  <Link to="/">back to the homepage.</Link>
                </p>
              ) : (
                <>
                  {console.log(isStudent)}
                  {isStudent === "true" ? (
                    <form onSubmit={handleFormSubmit}>
                      <h2>Student</h2>
                      <input
                        className="form-input"
                        placeholder="Your username"
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                      />
                      <input
                        className="form-input"
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                      />
                      <input
                        className="form-input"
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                      />
                      <input
                        className="form-input"
                        placeholder="Your grade"
                        name="grade"
                        type="grade"
                        value={formState.password}
                        onChange={handleChange}
                      />
                      <button
                        className="btn btn-block btn-info"
                        style={{ cursor: 'pointer' }}
                        type="submit"
                      >
                        Submit
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleFormSubmit}>
                      <h2>Tutor</h2>
                      <input
                        className="form-input"
                        placeholder="Your username"
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                      />
                      <input
                        className="form-input"
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                      />
                      <input
                        className="form-input"
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                      />
                      <>
                        {/* <div role="listbox" aria-expanded="false" aria-multiselectable="true" class="ui fluid multiple selection dropdown" tabindex="0"><div aria-atomic="true" aria-live="polite" role="alert" class="divider default text">Choose an option</div><i aria-hidden="true" class="dropdown icon"></i><div class="menu transition"><div style={{pointerEvents: 'all'}} role="option" aria-checked="false" aria-selected="true" class="selected item"><span class="text">One</span></div><div style={{pointerEvents: 'all'}} role="option" aria-checked="false" aria-selected="false" class="item"><span class="text">Two</span></div><div style={{pointerEvents: 'all'}} role="option" aria-checked="false" aria-selected="false" class="item"><span class="text">Three</span></div></div></div> */}
                        <select name="skills" multiple="" class="ui fluid dropdown">
                          <option value="">Skills</option>
                          <option value="angular">Angular</option>
                          <option value="css">CSS</option>
                          <option value="design">Graphic Design</option>
                          <option value="ember">Ember</option>
                          <option value="html">HTML</option>
                          <option value="ia">Information Architecture</option>
                          <option value="javascript">Javascript</option>
                          <option value="mech">Mechanical Engineering</option>
                          <option value="meteor">Meteor</option>
                          <option value="node">NodeJS</option>
                          <option value="plumbing">Plumbing</option>
                          <option value="python">Python</option>
                          <option value="rails">Rails</option>
                          <option value="react">React</option>
                          <option value="repair">Kitchen Repair</option>
                          <option value="ruby">Ruby</option>
                          <option value="ui">UI Design</option>
                          <option value="ux">User Experience</option>
                        </select>
                      </>
                      <button
                        className="btn btn-block btn-info"
                        style={{ cursor: 'pointer' }}
                        type="submit"
                      >
                        Submit
                      </button>
                    </form>
                  )}

                </>
              )}


              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </div></>) : (<></>)}

        </div>
      </div>
    </main>
  );
};

export default Signup;

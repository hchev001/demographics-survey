/**
 * Filters what data is returned from database queries.
 */
export default (user, route) => {
  let projection = {};

  switch (route) {
    case "GET /users":
      projection = { username: 1, _id: 1 };
      break;
    case "GET /users/:id":
      projection = {
        __v: 0
      };
      break;
    case "PUT /users/:id":
      projection = {
        __v: 0
      };
      break;
  }

  return projection;
};

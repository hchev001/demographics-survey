/**
 * Filters what data is returned from database queries.
 */
export default (user, route) => {
  let projection = {};

  switch (route) {
    case "GET /auth":
      projection = {
        __v: 0
      };
      break;
    case "GET /auth/:id":
      projection = {
        __v: 0
      };
      break;
    case "PUT /auth/:id":
      projection = {
        __v: 0
      };
      break;
  }

  return projection;
};

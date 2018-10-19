/**
 * Filters what data is returned from database queries.
 */
export default (user, route) => {
  let projection = {};

  switch (route) {
    case "GET /questions":
      projection = {
        __v: 0
      };
      break;
    case "GET /questions/:id":
      projection = {
        __v: 0
      };
      break;
    case "PUT /questions/:id":
      projection = {
        __v: 0
      };
      break;
  }

  return projection;
};
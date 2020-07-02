// const expect = require('chai').expect;
// const MovieController = require('../src/presentation/controllers/movie-controller');

// const makeMovieServiceStub = () => {
//   class MovieServiceStub {
//     insert() {
//       return '123456';
//     }
//   }

//   return new MovieServiceStub();
// };

// const makeSut = () => {
//   const movieServiceStub = makeMovieServiceStub();
//   const sut = new MovieController({ movieService: movieServiceStub });

//   return { sut, movieServiceStub };
// };

// describe('MovieController', function () {
//   describe('#create', function () {
//     it('should return status code 400 name is required', function () {
//       const { sut } = makeSut();
//       const request = {
//         params: {
//           director: 'Jonas Cub',
//           amount: 5,
//           genre: 'comedy',
//         },
//       };
//       const response = sut.create(request);

//       expect(response).to.be.an('object');
//       expect(response.statusCode).to.equal(400);
//       expect(response.message).to.equal('name is required');
//     });

//     it('should return success', function () {
//       const { sut } = makeSut();
//       const request = {
//         params: {
//           name: 'Em busca do código limpo',
//           director: 'Jonas Cub',
//           amount: 5,
//           genre: 'comedy',
//         },
//       };
//       const response = sut.create(request);

//       expect(response).to.be.an('object');
//       expect(response.statusCode).to.equal(200);
//       expect(response.body.message).to.equal('Movie saved !');
//     });
//   });
// });

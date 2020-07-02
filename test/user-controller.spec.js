// const expect = require('chai').expect;

// const MomentAdapter = require('../src/utils/adapters/moment-adapter');
// const CPFValidatorAdapter = require('../src/utils/adapters/cpf-validator-adapter');
// const UserService = require('../src/services/user-service');
// const UserController = require('../src/presentation/controllers/user-controller');

// const makeUserRepositoryStub = () => {
//   class UserRepositoryStub {
//     insert() {
//       return true;
//     }
//   }

//   return new UserRepositoryStub();
// };

// const makeSut = () => {
//   const userRepositoryStub = makeUserRepositoryStub();
//   const momentAdapterStub = new MomentAdapter();
//   const cpfValidatorAdapterStub = new CPFValidatorAdapter();
//   const userServiceStub = new UserService({
//     userRepository: userRepositoryStub,
//   });
//   const sut = new UserController({
//     userService: userServiceStub,
//     userRepository: userRepositoryStub,
//     momentAdapter: momentAdapterStub,
//     cpfValidatorAdapter: cpfValidatorAdapterStub,
//   });
//   return {
//     sut,
//     userRepositoryStub,
//   };
// };

// describe('MovieController', function () {
//   describe('#register', function () {
//     it('should return success', function () {
//       const request = {
//         params: {
//           name: 'Leonardo',
//           birthday: '1998-10-26',
//           cpf: '15760505050',
//           phoneNumber: '31988551060',
//           gender: 'Male',
//         },
//       };
//       const { sut } = makeSut();
//       const response = sut.register(request);
//       expect(response.body).to.be.an('string');
//       expect(sut.register(response.body)).to.equal('User registered !');
//     });
//   });

//   describe('#update', function () {
//     it('should return success update', function () {
//       const request = {
//         params: {
//           name: 'Leonardo',
//           birthday: '1998-10-26',
//           cpf: '15760505050',
//           phoneNumber: '31988551060',
//           gender: 'Male',
//         },
//       };
//       const { sut } = makeSut();
//       const response = sut.register(request);
//       expect(response.body).to.be.an('string');
//       expect(sut.register(response.body)).to.equal('User registered !');
//     });
//   });
// });


const adminController = require('../controllers/adminController');
const Place = require('../models/Place');
const User = require('../models/User');

jest.mock('../models/Place');
jest.mock('../models/User');

describe('Admin Controller', () => {
  describe('getAllPerks', () => {
    it('should return base perks when no places have perks', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const basePerks = [
        { name: 'wifi' },
        { name: 'parking' },
        { name: 'tv' },
        { name: 'radio' },
        { name: 'pets' },
        { name: 'enterence' },
      ];

      Place.find.mockResolvedValue([]);

      await adminController.getAllPerks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: basePerks,
      });
    });
  it('should return base perks and perks from places', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const basePerks = [
        { name: 'wifi' },
        { name: 'parking' },
        { name: 'tv' },
        { name: 'radio' },
        { name: 'pets' },
        { name: 'enterence' },
      ];

      const placesWithPerks = [
        {
          perks: ['wifi', 'new-perk'],
        },
      ];

      Place.find.mockResolvedValue(placesWithPerks);

      await adminController.getAllPerks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.arrayContaining([
          ...basePerks,
          { name: 'new-perk', icon: '' },
        ]),
      });
      expect(res.json.mock.calls[0][0].data.length).toBe(basePerks.length + 1);
    });
  });

  describe('addPerk', () => {
    it('should add a perk to a place', async () => {
      const req = {
        body: { name: 'new-perk' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockPlace = {
        perks: ['wifi'],
        save: jest.fn().mockResolvedValue(true),
      };

      Place.findOne.mockResolvedValue(mockPlace);

      await adminController.addPerk(req, res);

      expect(Place.findOne).toHaveBeenCalled();
      expect(mockPlace.save).toHaveBeenCalled();
      expect(mockPlace.perks).toContain('new-perk');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: ['wifi', 'new-perk'],
      });
    });
  });

  describe('deletePerk', () => {
    it('should delete a perk from a place', async () => {
      const req = {
        params: { name: 'wifi' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockPlace = {
        perks: ['wifi', 'parking'],
        save: jest.fn().mockResolvedValue(true),
      };

      Place.findOne.mockResolvedValue(mockPlace);

      await adminController.deletePerk(req, res);

      expect(Place.findOne).toHaveBeenCalled();
      expect(mockPlace.save).toHaveBeenCalled();
      expect(mockPlace.perks).not.toContain('wifi');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: ['parking'],
      });
    });
  });

  describe('createManager', () => {
    it('should create a manager', async () => {
      const req = {
        body: {
          name: 'test manager',
          email: 'manager@test.com',
          password: 'password',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const userInstance = {
        save: jest.fn().mockResolvedValue({}),
      };
      User.mockImplementation(() => userInstance);

      await adminController.createManager(req, res);

      expect(User).toHaveBeenCalledWith({
        name: 'test manager',
        email: 'manager@test.com',
        password: 'password',
        isAdmin: true,
      });
      expect(userInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: userInstance,
      });
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const req = {
        params: { id: '1' },
        body: { name: 'new name', email: 'new@email.com' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const updatedUser = { _id: '1', name: 'new name', email: 'new@email.com' };
      User.findByIdAndUpdate.mockResolvedValue(updatedUser);

      await adminController.updateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { name: 'new name', email: 'new@email.com' },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User updated successfully',
        data: updatedUser,
      });
    });

    it('should return 404 if user not found', async () => {
      const req = {
        params: { id: '1' },
        body: { name: 'new name', email: 'new@email.com' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByIdAndUpdate.mockResolvedValue(null);

      await adminController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('updateUserRole', () => {
    it('should update a user role', async () => {
      const req = {
        params: { id: '1' },
        body: { role: 'admin' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const updatedUser = { _id: '1', role: 'admin' };
      User.findByIdAndUpdate.mockResolvedValue(updatedUser);

      await adminController.updateUserRole(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { role: 'admin' },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: updatedUser,
      });
    });

    it('should return 404 if user not found', async () => {
      const req = {
        params: { id: '1' },
        body: { role: 'admin' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByIdAndUpdate.mockResolvedValue(null);

      await adminController.updateUserRole(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found',
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const req = {
        params: { id: '1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByIdAndDelete.mockResolvedValue({});

      await adminController.deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Utilisateur supprimé',
      });
    });
  });

  describe('getAllPlaces', () => {
    it('should get all places', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const places = [{ name: 'place1' }, { name: 'place2' }];
      Place.find.mockResolvedValue(places);

      await adminController.getAllPlaces(req, res);

      expect(Place.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: places,
      });
    });
  });

  describe('addPlace', () => {
    it('should add a place', async () => {
      const req = {
        body: { name: 'new place' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const placeInstance = {
        save: jest.fn().mockResolvedValue({ name: 'new place' }),
      };
      Place.mockImplementation(() => placeInstance);

      await adminController.addPlace(req, res);

      expect(Place).toHaveBeenCalledWith({ name: 'new place' });
      expect(placeInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Place added successfully',
        data: { name: 'new place' },
      });
    });
  });

  describe('updatePlace', () => {
    it('should update a place', async () => {
      const req = {
        params: { id: '1' },
        body: { name: 'new name' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const updatedPlace = { _id: '1', name: 'new name' };
      Place.findByIdAndUpdate.mockResolvedValue(updatedPlace);

      await adminController.updatePlace(req, res);

      expect(Place.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { name: 'new name' },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Place updated successfully',
        data: updatedPlace,
      });
    });

    it('should return 404 if place not found', async () => {
      const req = {
        params: { id: '1' },
        body: { name: 'new name' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Place.findByIdAndUpdate.mockResolvedValue(null);

      await adminController.updatePlace(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Place not found',
      });
    });
  });

  describe('deletePlace', () => {
    it('should delete a place', async () => {
      const req = {
        params: { id: '1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const deletedPlace = { _id: '1', name: 'deleted place' };
      Place.findByIdAndDelete.mockResolvedValue(deletedPlace);

      await adminController.deletePlace(req, res);

      expect(Place.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Place deleted successfully',
        data: deletedPlace,
      });
    });

    it('should return 404 if place not found', async () => {
      const req = {
        params: { id: '1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Place.findByIdAndDelete.mockResolvedValue(null);

      await adminController.deletePlace(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Place not found',
      });
    });
  });

  describe('updateUserProfile', () => {
    it('should update a user profile', async () => {
      const req = {
        params: { id: '1' },
        body: { name: 'new name' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const updatedUser = { _id: '1', name: 'new name' };
      User.findByIdAndUpdate.mockResolvedValue(updatedUser);

      await adminController.updateUserProfile(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { name: 'new name' },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: updatedUser,
      });
    });
  });

  describe('getAllUsers', () => {
    it('should get all users', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const users = [{ name: 'user1' }, { name: 'user2' }];
      User.find.mockResolvedValue(users);

      await adminController.getAllUsers(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: users,
      });
    });
  });

  describe('getAllReviews', () => {
    it('should get all reviews', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const reviews = [{ text: 'review1' }, { text: 'review2' }];
      const places = [{ reviews: [reviews[0]] }, { reviews: [reviews[1]] }];

      const populate2 = jest.fn().mockResolvedValue(places);
      const populate1 = jest.fn(() => ({ populate: populate2 }));
      Place.find.mockImplementation(() => ({ populate: populate1 }));

      await adminController.getAllReviews(req, res);

      expect(Place.find).toHaveBeenCalled();
      expect(populate1).toHaveBeenCalledWith('reviews.user', 'name');
      expect(populate2).toHaveBeenCalledWith('reviews.replies.user', 'name');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: reviews,
      });
    });
  });

  describe('deleteReview', () => {
    it('should delete a review', async () => {
      const req = {
        params: { reviewId: '1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Place.updateMany.mockResolvedValue({ nModified: 1 });

      await adminController.deleteReview(req, res);

      expect(Place.updateMany).toHaveBeenCalledWith(
        {},
        { $pull: { reviews: { _id: '1' } } }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Commentaire supprimé avec succès',
      });
    });

    it('should return 404 if review not found', async () => {
      const req = {
        params: { reviewId: '1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Place.updateMany.mockResolvedValue({ nModified: 0 });

      await adminController.deleteReview(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Aucun avis trouvé avec cet ID',
      });
    });
  });

  describe('deleteReply', () => {
    it('should delete a reply', async () => {
      const req = {
        params: { reviewId: '1', replyId: '2' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Place.updateOne.mockResolvedValue({ nModified: 1 });

      await adminController.deleteReply(req, res);

      expect(Place.updateOne).toHaveBeenCalledWith(
        { 'reviews._id': '1' },
        { $pull: { 'reviews.$.replies': { _id: '2' } } }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Réponse supprimée avec succès',
      });
    });

    it('should return 404 if reply not found', async () => {
      const req = {
        params: { reviewId: '1', replyId: '2' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Place.updateOne.mockResolvedValue({ nModified: 0 });

      await adminController.deleteReply(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Aucune réponse trouvée avec cet ID',
      });
    });
  });
});

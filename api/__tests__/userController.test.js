const userController = require('../controllers/userController');

describe('User Controller - Logout', () => {
  it('should clear the token cookie and return a success message', async () => {
    const res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.logout({}, res);

    expect(res.cookie).toHaveBeenCalledWith('token', null, {
      expires: expect.any(Date), 
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    // Ensure the expires date is in the past
    const cookieCall = res.cookie.mock.calls[0];
    const expiresDate = cookieCall[2].expires;
    expect(expiresDate.getTime()).toBeLessThanOrEqual(Date.now());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Logged out',
    });
  });
});
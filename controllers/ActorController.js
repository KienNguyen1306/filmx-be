// controllers/ActorController.js
const Actor = require('../models/Actor');

// Lấy danh sách tất cả các diễn viên
exports.getAllActors = async (req, res) => {
  try {
    const actors = await Actor.findAll();
    res.json(actors);
  } catch (error) {
    console.error('Error getting actors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Tạo một diễn viên mới
exports.createActor = async (req, res) => {
  try {
    const { name, birthdate } = req.body;
    const actor = await Actor.create({ name, birthdate });
    res.json(actor);
  } catch (error) {
    console.error('Error creating actor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Cập nhật thông tin diễn viên
exports.updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthdate } = req.body;
    const actor = await Actor.findByPk(id);

    if (!actor) {
      return res.status(404).json({ error: 'Actor not found' });
    }

    actor.name = name;
    actor.birthdate = birthdate;
    await actor.save();

    res.json(actor);
  } catch (error) {
    console.error('Error updating actor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Xóa một diễn viên
exports.deleteActor = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);

    if (!actor) {
      return res.status(404).json({ error: 'Actor not found' });
    }

    await actor.destroy();
    res.json({ message: 'Actor deleted successfully' });
  } catch (error) {
    console.error('Error deleting actor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

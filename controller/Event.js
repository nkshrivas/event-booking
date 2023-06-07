const Event = require("../models/eventSchema");
const router = require("express").Router();

const multer = require('multer');

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where the uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });



router.get('/events/:id', (req, res) => {
  const eventId = req.params.id;

  Event.findById(eventId)
    .then(event => {
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to retrieve event' });
    });
});


router.get('/events', (req, res) => {
  const eventType = req.query.type;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);

  const query = eventType === 'latest' ? {} : {};

  Event.find(query)
    .sort({ schedule: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .then(events => {
      res.json(events);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to retrieve events' });
    });
});
router.post('/events', upload.single('image'), (req, res) => {
    const eventData = req.body;
  
    // Get the file path of the uploaded image
    const imagePath = req.file.path;
  
    // Add the imagePath to the eventData object
    eventData.image = imagePath;
  
    Event.create(eventData)
      .then(event => {
        res.status(201).json(event._id);
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  });
  

router.put('/events/:id', (req, res) => {
  const eventId = req.params.id;
  const eventData = req.body;

  Event.findByIdAndUpdate(eventId, eventData, { new: true })
    .then(event => {
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to update event' });
    });
});


router.delete('/events/:id', (req, res) => {
  const eventId = req.params.id;

  Event.findByIdAndDelete(eventId)
    .then(event => {
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.sendStatus(204);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to delete event' });
    });
});

module.exports = router;

const express = require('express');
const moment = require('moment');
const multer = require('multer');

const gMap = require('../lib/gMapService');
const g = require('../lib/gService');

const router = express.Router();
const upload = multer({
  limits: {
    // bytes
    fileSize: 100 * 1024 * 1024,
  },
});

router.post('', upload.single('file'), (req, res) => {
  const now = moment().format('YYYY/MM/DD/HH/mm_ss_SSS');
  const key = `${now}_${req.file.originalname}`;
  g.put(key, req.file)
    .then(() => gMap.save(key))
    .then((ri) => {
      const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
      res.json({
        data: {
          url: `${url}${ri}`,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('something wrong');
    });
});

router.get('/:ri', (req, res) => {
  const { ri } = req.params;
  gMap.query(ri)
    .then(({ Items }) => {
      if (Items.length === 0) {
        return Promise.reject(new Error('ri not found'));
      }
      const path = Items[0].path.S;
      return g.get(path);
    })
    .then((data) => {
      res.contentType(data.ContentType);
      res.send(data.Body);
    })
    .catch(() => {
      res.status(404).send('not found');
    });
});

module.exports = router;
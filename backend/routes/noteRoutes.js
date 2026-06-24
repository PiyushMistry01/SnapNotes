const express = require('express')
const router = express.Router()

const Note = require('../models/Note')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    )
  }
})

const upload = multer({ storage })

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ _id: -1 })
    res.json(notes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post(
  '/',
  upload.single('image'),
  async (req, res) => {

    console.log('BODY:', req.body)
    console.log('FILE:', req.file)

    try {
      const note = await Note.create({
        imageUrl: `/uploads/${req.file.filename}`,
        caption: req.body.caption,
        date: req.body.date,
        rotation: req.body.rotation
      })

      console.log('SAVED:', note)

      res.status(201).json(note)

    } catch (err) {
      console.log('ERROR:', err)
      res.status(500).json({ error: err.message })
    }
  }
)

router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        caption: req.body.caption
      },
      { new: true }
    )

    res.json(note)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id)

    res.json({
      success: true
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
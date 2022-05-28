const Joi = require('joi'); // Section 4: Building RESTful API's Using Express
const express = require('express');
const router = express.Router();

// ============================
// Section 4: Building RESTful API's Using Express
// ============================
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});


// create a new course
router.post('/', (req, res) => {
    const { value, error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: value.name
    };
    courses.push(course);
    res.send(course);
});
// update a course
router.put('/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Update course
    // Return the updated course
    course.name = req.body.name;
    res.send(course);
});

// delete a course
router.delete('/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    // Return the same course
    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

module.exports = router;
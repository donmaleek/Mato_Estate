/**
 * Test Controller
 * ------------------------
 * This simple controller verifies that the route and server 
 * are correctly set up and responding. 
 * Useful for confirming that the backend is operational.
 */
export const test = (req, res) => {
    res.json({ message: 'Route is working, Engineer Sir.' });
};

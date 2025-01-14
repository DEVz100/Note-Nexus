router.get("/subjects/:subjectId", async (req, res) => {
  try {
    const subjectId = req.params.subjectId;
    // Query your database to get subject data
    const subjectData = await Subject.findOne({ subject_id: subjectId });
    res.json({ subjects: subjectData });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subject data" });
  }
});

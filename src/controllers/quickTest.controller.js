import quickTestService from '../services/quickTest.service.js';

const getAllQuickTests = async (req, res) => {
  const userId = req.decodedUserId;
  const [result, error] = await quickTestService.getAllQuickTests(userId);

  if (error) {
    return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result && result.length > 0) {
    return res.status(200).json({ success: true, data: result });
  } else {
    return res.status(200).json({ success: true, data: result });
  }
};

const getQuickTest = async (req, res) => {
  const userId = req.decodedUserId;
  const quickTestId = req.params.id;

  const [result, error] = await quickTestService.getQuickTest(quickTestId, userId);

  if (error) {
    return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result && result.length > 0) {
    return res.status(200).json({ success: true, data: result });
  } else {
    return res.status(404).json({ success: false, data: null });
  }
};

const createQuickTest = async (req, res) => {
  const userId = req.decodedUserId;
  const data = req.body;

  const [result, error] = await quickTestService.createQuickTest(data, userId);

  if (error) {
    return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result.affectedRows > 0) {
    const quickTestId = result.insertId;

    const [examResult, error] = await quickTestService.getQuickTest(quickTestId, userId);

    if (error) {
      return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
  
    if (examResult && examResult.length > 0) {
      return res.status(200).json({ success: true, data: examResult });
    } else {
      return res.status(404).json({ success: false, data: null });
    }
  }
};

const deleteQuickTest = async (req, res) => {
  const userId = req.decodedUserId;
  const examId = req.params.id;

  const [result, error] = await quickTestService.deleteQuickTest(examId, userId);

  if (error) {
    return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result.affectedRows > 0) {
    return res.status(200).json({ success: true, message: 'Quick test borrado' });
  } else {
    return res.status(404).json({ success: false, message: 'No se encontro un quick test relacionado' });
  }
};

export default { getAllQuickTests, getQuickTest, createQuickTest, deleteQuickTest };

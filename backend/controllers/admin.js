const userWallet = require('../models/wallet');
exports.postAddExp = async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const detail = req.body.detail;
        const category = req.body.category;
        const data = await userWallet.create({
            amount: amount,
            detail: detail,
            category: category
        })
        res.status(201).json({ newExpenseDetail: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}

exports.getExpense = async (req, res, next) => {
    try {
        const getWallet = await userWallet.findAll();
        res.status(200).json({ allUsers: getWallet });
        console.log(getWallet);
    } catch (err) {
        console.log('***GET expense failed***', JSON.stringify(err));
        res.status(500).json({
            error: err
        })
    }
}

exports.deleteExpense = async (req, res, next) => {
    try {
        if (req.params.id == 'undefined') {
            console.log('ID is missing');
            return res.status(400).json({ err: 'ID is missing' });
        }
        const uId = req.params.id;
        await userWallet.destroy({ where: { id: uId } });
        res.status(200);
    } catch (err) {
        console.log('***DELETE failed***', JSON.stringify(err));
        res.status(500).json({
            error: err
        })
    }
}

exports.editExpense = async (req, res, next) => {
    try {
        if (!req.params.id) {
            console.log('ID is missing');
            return res.status(400).json({ err: 'ID is missing' });
        }
        const uId = req.params.id;
        const updatedAmount = req.body.amount;
        const updatedDetail = req.body.detail;
        const updatedCategory = req.body.category;
        data = await userWallet.findByPk(uId).then(userWall => {
            userWall.amount = updatedAmount;
            userWall.detail = updatedDetail;
            userWall.category = updatedCategory;
            return userWall.save();
        })
        res.status(201).json({ newExpenseDetail: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}
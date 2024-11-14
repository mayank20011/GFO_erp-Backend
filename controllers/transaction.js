// GET All Transactions
// @route GET /GFOERP
export function getTransactions(req,res,next)
{
   res.send('Get Transactions');
}
export function addTransaction(req,res,next)
{
    res.send('Add Transaction');
}
export function deleteTransaction(req,res,next)
{
    res.send('Delete Transaction');
}


// server.use('/',router);
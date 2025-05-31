const error = {};

error.InternalServer = function(res, errMsg = null)
{
    if(errMsg != null)
        return res.status(500).json({ error: errMsg });
    return res.status(500).json({ error: "Internal server error." });
};

error.BadRequest = function(res, errMsg = null)
{
    if(errMsg != null)
        return res.status(400).json({ error: errMsg });
    return res.status(400).json({ error: "Bad request" });
};

error.Unauthorized = function(res, errMsg = null)
{
    if(errMsg != null)
        return res.status(401).json({ error: errMsg });
    return res.status(401).json({ error: "Unauthorized" });
};

error.Forbidden = function(res, errMsg = null)
{
        if(errMsg != null)
        return res.status(403).json({ error: errMsg });
    return res.status(403).json({ error: "Forbidden" });
};

error.Conflict = function(res, errMsg = null)
{
        if(errMsg != null)
        return res.status(409).json({ error: errMsg });
    return res.status(409).json({ error: "Conflict" });
};

error.NotFound = function(res, errMsg = null)
{
        if(errMsg != null)
        return res.status(404).json({ error: errMsg });
    return res.status(404).json({ error: "Not found" });
};

module.exports = error;

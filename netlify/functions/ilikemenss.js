exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({"token_type": "Bearer","access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJpYWwiOiJkcmFrZWxlYWsxIiwiaWF0IjoxNzIyNzMzNjY2fQ.dWl9Jfdmw-lupnCm-bVnhwbA093wEQL3_uUpYct37Aw"})
    };
};
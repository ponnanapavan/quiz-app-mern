async function getdata() {
    try {
        const quizdata = await fetch("http://localhost:4000/quizdata");
        const response = await quizdata.json();
        const quizForm = document.getElementById("quizdataForm");

        response.data.forEach(question => {
            const questionElement = document.createElement('div');
            questionElement.innerHTML = `
                <p>${question.question}</p>
                <ul>
                    ${question.options.map(option => `<li><input type="radio" name="answers[${question.id}]" value="${option}">${option}</li>`).join('')}
                </ul>
            `;
            quizForm.appendChild(questionElement);
        });
        
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit';
        submitBtn.type = 'button'; 
        submitBtn.id = 'submit-btn'; 
        
        submitBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            try {
                const formData = new FormData(quizForm);
                const jsonObject = {};
                formData.forEach((value, key) => {
                    jsonObject[key] = value;
                });
                const response = await fetch("http://localhost:4000/quizsubmit", {
                    method: 'POST',
                    body: JSON.stringify(jsonObject),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const finalResponse = await response.json();
                
                const scoreDisplay = document.getElementById("scoreDisplay");
                scoreDisplay.textContent = `Your final score: ${finalResponse.score}`;
            } catch (err) {
                console.error(err);
            }
        });
        quizForm.appendChild(submitBtn);
    } catch (err) {
        console.error(err);
    }
}

getdata();

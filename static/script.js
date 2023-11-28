"use strict";

// Initialize vote counts
let happyCount = 0;
let excitedCount = 0;
let sadCount = 0;
let angryCount = 0;
let sickCount = 0;
let lovingCount = 0;
let mostVotedImage = "";
let pollName = "feeling";

/**
 * Submits the vote for quickpoll.
 *
 * @param emoticon {string} Emoticon to vote for (must match the option key).
 */
function submit_vote(emoticon) {
	// Prepare the request.
	const xhr = new XMLHttpRequest();
	xhr.open("POST", `/api/vote/${pollName}`, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	// Set up the response callback.
	xhr.onreadystatechange = () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				console.log("Voted for " + emoticon);
			} else {
				console.error("Failed to vote for " + emoticon);
			}
		}
	};

	// Perform the request.
	xhr.send(`option=${emoticon}`);
}

// Function to handle votes
function vote(emotion) {
	// Submit the vote to quickpoll
	submit_vote(emotion);

	// Update the counters.
    switch (emotion) {
        case 'happy':
            happyCount++;
            document.getElementById('happyCount').innerText = 'Happy: ' + happyCount;
            break;
        case 'excited':
            excitedCount++;
            document.getElementById('excitedCount').innerText = 'Excited: ' + excitedCount;
            break;
        case 'sad':
            sadCount++;
            document.getElementById('sadCount').innerText = 'Sad: ' + sadCount;
            break;
        case 'angry':
            angryCount++;
            document.getElementById('angryCount').innerText = 'Angry: ' + angryCount;
            break;
        case 'sick':
            sickCount++;
            document.getElementById('sickCount').innerText = 'Sick: ' + sickCount;
            break;
		case 'loving':
			lovingCount++;
			document.getElementById('lovingCount').innerText = 'Loving: ' + lovingCount;
			break;
		default:
			console.log('Invalid emotion');
    }

	// Update most voted emotion
	updateMostVoted();
}

// Function to update most voted emotion
function updateMostVoted() {
	const voteCounts = [happyCount, excitedCount, sadCount, angryCount, sickCount, lovingCount];
	const emotions = ['Happy', 'Excited', 'Sad', 'Angry', 'Sick', 'Loving'];
	const emotionsImages = ['assets/Happy-Emoji.svg',"assets/Excited-Emoji.svg", "assets/Sad-Emoji.svg", "assets/Angry-Emoji.svg", "assets/Sick-Emoji.svg", "assets/Loving-Emoji.svg"];

	// Find the index of the emotion with the maximum votes
	const mostVotedIndex = voteCounts.indexOf(Math.max(...voteCounts));

	// Display the most voted emotion
	//document.getElementById('mostVoted').src = "assets/Emotion1.svg" !== -1 ? emotions[mostVotedIndex] : 'None';
	document.getElementById('mostVoted').src = emotionsImages[mostVotedIndex];
}
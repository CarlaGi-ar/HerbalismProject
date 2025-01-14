document.addEventListener('DOMContentLoaded', () => {
    // Fetch the herbs JSON file
    fetch('./data/herbs.json')
        .then(response => {
            console.log(`Fetch response: ${response.status} ${response.statusText}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Herbs data loaded successfully:', data);

            // DOM Elements
            const herbsList = document.getElementById('herbs-list');
            const herbDetails = document.getElementById('herb-details');
            const herbName = document.getElementById('herb-name');
            const herbImage = document.getElementById('herb-image');
            const herbDescription = document.getElementById('herb-description');
            const herbBenefits = document.getElementById('herb-benefits');
            const searchBar = document.getElementById('search-bar');

            // Function to display herbs in the list
            const displayHerbs = (filteredHerbs) => {
                herbsList.innerHTML = ''; // Clear existing list
                filteredHerbs.forEach(herb => {
                    const listItem = document.createElement('li');
                    listItem.textContent = herb.name;
                    listItem.classList.add('herb-item');

                    // Add click event to show herb details
                    listItem.addEventListener('click', () => {
                        showHerbDetails(herb);
                    });

                    herbsList.appendChild(listItem);
                });
            };

            // Function to show herb details
            const showHerbDetails = (herb) => {
                herbName.textContent = herb.name;
                herbImage.src = herb.image;
                herbImage.alt = `${herb.name} image`;
                herbDescription.textContent = herb.description;

                // Populate benefits list
                herbBenefits.innerHTML = ''; // Clear previous benefits
                herb.benefits.forEach(benefit => {
                    const benefitItem = document.createElement('li');
                    benefitItem.textContent = benefit;
                    herbBenefits.appendChild(benefitItem);
                });

                // Show the herb details section
                herbDetails.classList.remove('hidden');
            };

            // Display all herbs initially
            displayHerbs(data);

            // Add search bar functionality
            searchBar.addEventListener('input', (event) => {
                const searchTerm = event.target.value.toLowerCase();
                const filteredHerbs = data.filter(herb =>
                    herb.name.toLowerCase().includes(searchTerm)
                );
                displayHerbs(filteredHerbs);
            });

            // Add Enter key functionality for direct herb selection
            searchBar.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    const searchTerm = searchBar.value.toLowerCase();
                    const foundHerb = data.find(herb =>
                        herb.name.toLowerCase() === searchTerm
                    );
                    if (foundHerb) {
                        showHerbDetails(foundHerb);
                    } else {
                        alert('No herb found with that name!');
                    }
                }
            });

            // Navigation bar functionality
            document.querySelectorAll('.nav-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const targetId = this.getAttribute('data-target');
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        // Hide all sections
                        document.querySelectorAll('.content-section').forEach(section => {
                            section.classList.remove('active');
                            section.classList.add('hidden');
                        });

                        // Show the targeted section
                        targetElement.classList.remove('hidden');
                        targetElement.classList.add('active');
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error loading herbs.json:', error);
            const herbsList = document.getElementById('herbs-list');
            herbsList.textContent = 'Failed to load herbs. Please try again later.';
        });
});
s

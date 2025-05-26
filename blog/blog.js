document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Change icon based on menu state
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close mobile menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && e.target !== mobileMenuBtn) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Share buttons functionality
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let shareUrl;
            
            if (button.classList.contains('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            } else if (button.classList.contains('linkedin')) {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            } else if (button.classList.contains('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // Video poster image fallback
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('error', () => {
            const poster = video.getAttribute('poster');
            if (poster) {
                const img = document.createElement('img');
                img.src = poster;
                img.alt = 'Video thumbnail';
                video.parentNode.replaceChild(img, video);
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add reading time estimate
    const articleContent = document.querySelector('.post-content');
    if (articleContent) {
        const text = articleContent.textContent;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
        
        const readingTimeElement = document.createElement('span');
        readingTimeElement.classList.add('reading-time');
        readingTimeElement.innerHTML = `<i class="far fa-clock"></i> ${readingTime} min de leitura`;
        
        const postMeta = document.querySelector('.post-meta');
        if (postMeta) {
            postMeta.appendChild(readingTimeElement);
        }
    }

    // Category filtering
    const categoryCards = document.querySelectorAll('.category-card');
    const blogPosts = [
        {
            url: 'posts/desenho-gestos.html',
            date: '2024-04-15',
            categories: ['visao']
        },
        {
            url: 'posts/deteccao-dedos.html',
            date: '2024-04-26',
            categories: ['visao', 'ia']
        }
    ];

    // Create empty category message
    function createEmptyMessage() {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-category-message';
        emptyMessage.innerHTML = `
            <div class="highlight-box text-center">
                <i class="fas fa-hourglass-half"></i>
                <h3>Em Breve</h3>
                <p>Novos posts desta categoria serão adicionados em breve!</p>
            </div>
        `;
        return emptyMessage;
    }

    function filterPosts(category) {
        const postsContainer = document.querySelector('.blog-posts');
        const postsGrid = document.querySelector('.posts-grid');
        const featuredPost = document.querySelector('.featured-post');
        const allPosts = document.querySelectorAll('.featured-post, .post-card');

        // Remove existing empty message if it exists
        const existingEmptyMessage = document.querySelector('.empty-category-message');
        if (existingEmptyMessage) {
            existingEmptyMessage.remove();
        }

        // Filter posts based on category
        let visiblePosts;
        if (category === 'all') {
            // Show all posts sorted by date
            visiblePosts = blogPosts;
        } else {
            // Filter posts for specific category
            visiblePosts = blogPosts.filter(post => post.categories.includes(category));
        }

        // Sort posts by date (newest first)
        visiblePosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Hide all posts first
        allPosts.forEach(post => {
            post.style.display = 'none';
        });

        if (visiblePosts.length === 0) {
            // No posts in this category - show empty message
            postsGrid.style.display = 'none';
            if (featuredPost) featuredPost.style.display = 'none';
            postsContainer.appendChild(createEmptyMessage());
        } else {
            // Show filtered posts
            postsGrid.style.display = 'grid';
            allPosts.forEach(post => {
                const postLink = post.querySelector('a.read-more').getAttribute('href');
                const shouldShow = visiblePosts.some(p => p.url === postLink);
                post.style.display = shouldShow ? 'block' : 'none';
            });
        }

        // Update active category styling
        categoryCards.forEach(card => {
            if (card.dataset.category === category) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Update URL
        const url = new URL(window.location.href);
        url.searchParams.set('categoria', category);
        window.history.pushState({}, '', url);
    }

    // Add click event listeners to category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            filterPosts(category);
        });
    });

    // Handle initial category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get('categoria') || 'all';
    filterPosts(initialCategory);
}); 
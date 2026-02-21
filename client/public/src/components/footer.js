class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                                <span class="text-white text-xl">🪷</span>
                            </div>
                            <div>
                                <h3 class="font-fredoka text-xl">Lotus Kindergarten</h3>
                                <p class="text-xs text-gray-400">Doha, Qatar</p>
                            </div>
                        </div>
                        <p class="text-gray-400 text-sm">Nurturing young minds and helping children bloom into confident, creative learners since 2009.</p>
                    </div>
                    
                    <div>
                        <h4 class="font-fredoka text-lg mb-4">Quick Links</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="about.html" class="hover:text-white transition">About Us</a></li>
                            <li><a href="programs.html" class="hover:text-white transition">Programs</a></li>
                            <li><a href="gallery.html" class="hover:text-white transition">Gallery</a></li>
                            <li><a href="contact.html" class="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-fredoka text-lg mb-4">Programs</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="programs.html" class="hover:text-white transition">Toddlers</a></li>
                            <li><a href="programs.html" class="hover:text-white transition">Pre-Kindergarten</a></li>
                            <li><a href="programs.html" class="hover:text-white transition">Kindergarten</a></li>
                            <li><a href="programs.html" class="hover:text-white transition">Summer Camp</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-fredoka text-lg mb-4">Resources</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="homework.html" class="hover:text-white transition">Parent Portal</a></li>
                            <li><a href="games.html" class="hover:text-white transition">Learning Games</a></li>
                            <li><a href="#" class="hover:text-white transition">Calendar</a></li>
                            <li><a href="#" class="hover:text-white transition">News & Updates</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p class="text-gray-400 text-sm">© 2024 Lotus Kindergarten Doha. All rights reserved.</p>
                    <p class="text-gray-400 text-sm">Licensed by Qatar Ministry of Education</p>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('app-footer', Footer);

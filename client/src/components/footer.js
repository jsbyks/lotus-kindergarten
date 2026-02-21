class Footer extends HTMLElement {
    connectedCallback() {
        const C       = window.SCHOOL_CONFIG || {};
        const name    = C.name       || 'Lotus Kindergarten';
        const emoji   = C.emoji      || '🪷';
        const city    = C.city       || 'Doha';
        const country = C.country    || 'Qatar';
        const founded = C.founded    || 2009;
        const year    = new Date().getFullYear();
        const phone   = C.phone      || '+974 4444 5555';
        const email   = C.email      || 'hello@lotuskindergarten.qa';
        const accred  = C.accreditation     || 'MOE Certified';
        const accBody = C.accreditationBody || 'Qatar Ministry of Education';
        const social  = C.social     || {};

        const socialLinks = [
            { url: social.facebook,  icon: 'fab fa-facebook-f',  label: 'Facebook'  },
            { url: social.instagram, icon: 'fab fa-instagram',   label: 'Instagram' },
            { url: social.twitter,   icon: 'fab fa-twitter',     label: 'Twitter'   },
            { url: social.youtube,   icon: 'fab fa-youtube',     label: 'YouTube'   }
        ].filter(s => s.url).map(s =>
            `<a href="${s.url}" aria-label="${s.label}" target="_blank" rel="noopener noreferrer"
               class="w-9 h-9 bg-gray-700 hover:bg-purple-500 rounded-full flex items-center justify-center transition">
               <i class="${s.icon} text-sm"></i></a>`
        ).join('');

        this.innerHTML = `
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                                <span class="text-white text-xl">${emoji}</span>
                            </div>
                            <div>
                                <h3 class="font-fredoka text-xl">${name}</h3>
                                <p class="text-xs text-gray-400">${city}, ${country}</p>
                            </div>
                        </div>
                        <p class="text-gray-400 text-sm">Nurturing young minds and helping children bloom into confident, creative learners since ${founded}.</p>
                        <div class="flex gap-2 mt-4">${socialLinks}</div>
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
                        <h4 class="font-fredoka text-lg mb-4">Contact</h4>
                        <ul class="space-y-2 text-gray-400 text-sm">
                            <li class="flex items-center gap-2"><i class="fas fa-phone"></i> ${phone}</li>
                            <li class="flex items-center gap-2"><i class="fas fa-envelope"></i> ${email}</li>
                        </ul>
                        <h4 class="font-fredoka text-lg mt-6 mb-4">Resources</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="homework.html" class="hover:text-white transition">Parent Portal</a></li>
                            <li><a href="games.html" class="hover:text-white transition">Learning Games</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p class="text-gray-400 text-sm">© ${year} ${name} ${city}. All rights reserved.</p>
                    <p class="text-gray-400 text-sm">${accred} — ${accBody}</p>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('app-footer', Footer);

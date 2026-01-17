
const headerHTML = `
<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
    <a href="index.html" class="flex items-center gap-2 relative z-50">
        <img src="/logo.png" alt="PixVas Logo" class="h-8 w-8 rounded-lg">
        <span class="text-xl font-extrabold tracking-tight">PixVas</span>
    </a>
    
    <!-- Mobile Menu Button -->
    <button id="mobile-menu-btn" class="md:hidden relative z-50 p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
        <span class="material-symbols-outlined text-2xl" id="menu-icon">menu</span>
    </button>

    <!-- Desktop Nav -->
    <div class="hidden md:flex items-center gap-8">
        <nav class="flex items-center gap-8">
            <div class="relative group">
                <button
                    class="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors py-2 nav-link" data-path="tools">
                    Tools
                    <span
                        class="material-symbols-outlined text-lg transition-transform group-hover:rotate-180">expand_more</span>
                </button>
                <div
                    class="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top w-64">
                    <div
                        class="rounded-2xl p-2 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col gap-1 bg-white dark:bg-[#1a1d24]">
                        <a href="vectorize.html"
                            class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group/item">
                            <div
                                class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                <span class="material-symbols-outlined text-lg">polyline</span>
                            </div>
                            <div>
                                <div class="text-sm font-bold text-gray-900 dark:text-white">Vectorize
                                    Engine</div>
                                <div class="text-[10px] text-gray-500 font-medium">SVG Converter</div>
                            </div>
                        </a>
                        <a href="bg-remover.html"
                            class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group/item">
                            <div
                                class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                <span class="material-symbols-outlined text-lg">auto_fix_high</span>
                            </div>
                            <div>
                                <div class="text-sm font-bold text-gray-900 dark:text-white">BG Remover Pro
                                </div>
                                <div class="text-[10px] text-gray-500 font-medium">Remove Backgrounds</div>
                            </div>
                        </a>
                        <a href="editor.html"
                            class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group/item">
                            <div
                                class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                <span class="material-symbols-outlined text-lg">aspect_ratio</span>
                            </div>
                            <div>
                                <div class="text-sm font-bold text-gray-900 dark:text-white">AI Upscaler
                                </div>
                                <div class="text-[10px] text-gray-500 font-medium">Enhance Images</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <a class="text-sm font-medium hover:text-primary transition-colors nav-link" href="about.html">About</a>
            <a class="text-sm font-medium hover:text-primary transition-colors nav-link" href="legal.html">Legal</a>
        </nav>
        <div class="flex items-center gap-4">
            <div
                class="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 border border-primary/20">
                <span class="relative flex h-2 w-2">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span class="text-xs font-bold text-primary uppercase tracking-wide">Free Forever - No Account Needed</span>
            </div>
        </div>
    </div>
</div>
`;

const mobileMenuHTML = `
<div id="mobile-menu" 
     class="fixed inset-0 z-[60] transform translate-x-full transition-transform duration-300 md:hidden flex flex-col pt-0"
     style="background-color: #ffffff; width: 100vw; height: 100vh;">
     
    <!-- Mobile Menu Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10">
        <div class="flex items-center gap-2">
            <img src="/logo.png" alt="PixVas Logo" class="h-8 w-8 rounded-lg">
            <span class="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">PixVas</span>
        </div>
        <button id="mobile-menu-close-btn" class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
            <span class="material-symbols-outlined text-2xl">close</span>
        </button>
    </div>

    <nav class="flex flex-col gap-6 text-lg font-bold px-6 py-6 overflow-y-auto">
        <div class="flex flex-col gap-4">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Tools</span>
            <a href="vectorize.html" class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800 mobile-link">
                <span class="material-symbols-outlined text-primary text-2xl">polyline</span>
                <span>Vectorize Engine</span>
            </a>
            <a href="bg-remover.html" class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800 mobile-link">
                <span class="material-symbols-outlined text-primary text-2xl">auto_fix_high</span>
                <span>BG Remover Pro</span>
            </a>
            <a href="editor.html" class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800 mobile-link">
                <span class="material-symbols-outlined text-primary text-2xl">aspect_ratio</span>
                <span>AI Upscaler</span>
            </a>
        </div>
        
        <div class="h-px w-full bg-gray-100 dark:bg-zinc-800 my-2"></div>

        <a class="flex items-center gap-3 px-2 py-2 mobile-link" href="about.html">About PixVas</a>
        <a class="flex items-center gap-3 px-2 py-2 mobile-link" href="legal.html">Legal & Privacy</a>
        
        <div class="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center text-center gap-3">
             <div class="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span class="material-symbols-outlined">favorite</span>
             </div>
             <h4 class="font-bold text-primary">Free Forever</h4>
             <p class="text-sm text-gray-500 dark:text-gray-400">No account required. Process images securely in your browser.</p>
        </div>
    </nav>
</div>
`;

const footerHTML = `
<div class="mx-auto max-w-7xl px-6 lg:px-10">
    <div class="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
        <div class="col-span-2">
            <div class="mb-6 flex items-center gap-2">
                <img src="/logo.png" alt="PixVas Logo" class="h-6 w-6 rounded-lg">
                <span class="text-lg font-extrabold">PixVas</span>
            </div>
            <p class="mb-6 max-w-xs text-sm text-[#606e8a] dark:text-gray-400">
                The 100% free, no-login platform for professional image processing. Open tools for creative
                workflows.
            </p>
            <div class="flex gap-4">
                <a class="text-[#606e8a] hover:text-primary" href="index.html"><span
                        class="material-symbols-outlined">public</span></a>
                <a class="text-[#606e8a] hover:text-primary" href="mailto:support@apprerum.com"><span
                        class="material-symbols-outlined">alternate_email</span></a>
            </div>
        </div>
        <div>
            <h6 class="mb-6 text-sm font-bold uppercase tracking-wider">Free Tools</h6>
            <ul class="space-y-4 text-sm text-[#606e8a] dark:text-gray-400">
                <li><a class="hover:text-primary" href="vectorize.html">Vectorize Engine</a></li>
                <li><a class="hover:text-primary" href="bg-remover.html">BG Remover Pro</a></li>
                <li><a class="hover:text-primary" href="editor.html">AI Upscaler</a></li>
            </ul>
        </div>
        <div>
            <h6 class="mb-6 text-sm font-bold uppercase tracking-wider">Resources</h6>
            <ul class="space-y-4 text-sm text-[#606e8a] dark:text-gray-400">
                <li><a class="hover:text-primary" href="about.html">About</a></li>
                <li><a class="hover:text-primary" href="contact.html">Contact</a></li>
                <li><a class="hover:text-primary" href="contact.html">Support</a></li>
            </ul>
        </div>
        <div>
            <h6 class="mb-6 text-sm font-bold uppercase tracking-wider">Legal</h6>
            <ul class="space-y-4 text-sm text-[#606e8a] dark:text-gray-400">
                <li><a class="hover:text-primary" href="legal.html#privacy">Privacy</a></li>
                <li><a class="hover:text-primary" href="legal.html#tos">Terms</a></li>
            </ul>
        </div>
    </div>
    <div
        class="mt-16 border-t border-[#dbdfe6] dark:border-white/10 pt-8 text-center text-xs text-[#606e8a] dark:text-gray-500">
        © ${new Date().getFullYear()} PixVas. 100% Free Forever. No Account Needed.
    </div>
</div>
`;

function injectHeader() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
        // Use FIXED instead of sticky to ensure it stays on top reliably, add padding to body to compensate
        headerContainer.className = "fixed top-0 left-0 right-0 z-50 w-full border-b border-[#dbdfe6] dark:border-white/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md";

        // Add padding to body to prevent content hidden behind fixed header
        document.body.classList.add('pt-[73px]');

        // Active state logic
        const currentPath = window.location.pathname;
        const navLinks = headerContainer.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Check if current path includes the href or if it's a tool page for the tools dropdown
            if (href && currentPath.includes(href)) {
                link.classList.add('text-primary');
            } else if (link.dataset.path === 'tools' && (currentPath.includes('vectorize') || currentPath.includes('bg-remover') || currentPath.includes('editor'))) {
                link.classList.add('text-primary');
            }
        });

        // Mobile Menu Logic
        // Remove existing mobile menu if it exists (to prevent duplicates on re-injection)
        const existingMenu = document.getElementById('mobile-menu');
        if (existingMenu) existingMenu.remove();

        // Inject Mobile Menu into Body
        document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);

        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeBtn = document.getElementById('mobile-menu-close-btn');
        const mobileLinks = mobileMenu.querySelectorAll('.mobile-link'); // Select from the newly injected menu
        let isMenuOpen = false;

        // Dark mode handling for menu background
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            mobileMenu.style.backgroundColor = '#0c0e12';
        }

        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('translate-x-full');
                mobileMenu.classList.add('translate-x-0');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                mobileMenu.classList.add('translate-x-full');
                mobileMenu.classList.remove('translate-x-0');
                document.body.style.overflow = '';
            }
        }

        if (menuBtn) {
            menuBtn.addEventListener('click', toggleMenu);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', toggleMenu);
        }

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) toggleMenu();
            });
        });
    }
}

function injectFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
        footerContainer.className = "border-t border-[#dbdfe6] dark:border-white/10 bg-white dark:bg-[#0c0e12] py-16";
    }
}

// Inject on load
document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
});

// Menu
export interface Menu {
  path?: string;
  title?: string;
  type?: string;
  megaMenu?: boolean;
  megaMenuType?: string; // small, medium, large
  image?: string;
  children?: Menu[];
}

export const MENUITEMS: Menu[] = [
	// {
	// 	title: 'home', type: 'sub', children: [
	//       { path: 'home/one', title: 'Fashion-01', type: 'extTabLink' },          
	//       { path: 'home/two', title: 'Fashion-02', type: 'extTabLink'},         
	//       { path: 'home/three', title: 'Fashion-03', type: 'extTabLink' },         
	//       { path: 'home/four', title: 'vegetable', type: 'extTabLink' },        
	//       { path: 'home/five', title: 'watch', type: 'extTabLink' },        
	//       { path: 'home/six', title: 'furniture', type: 'extTabLink' },        
	//       { path: 'home/seven', title: 'flower', type: 'extTabLink' },    
	//       { path: 'home/eight', title: 'beauty', type: 'extTabLink' },   
	//       { path: 'home/nine', title: 'electronics', type: 'extTabLink' },   
	//       { path: 'home/ten', title: 'pets', type: 'extTabLink' },   
	//       { path: 'home/eleven', title: 'metro', type: 'extTabLink' },   
	//       { path: 'home/twelve', title: 'gym', type: 'extTabLink' },   
	//       { path: 'home/thirteen', title: 'tools', type: 'extTabLink' },   
	//       { path: 'home/fourteen', title: 'marijuana', type: 'extTabLink' }  
	//     ]
	// },
	// {
	// 	title: 'category', type: 'sub', megaMenu: true, megaMenuType: 'small', children: [
	//       { path: '/blog/left-sidebar', title: 'blog-left-sidebar', image: 'assets/images/feature/blog-page.jpg', type: 'link' },
	//       { path: '/blog/right-sidebar', title: 'blog-right-sidebar', image: 'assets/images/feature/blog(right-sidebar).jpg', type: 'link' },
	//       { path: '/blog/details', title: 'blog-detail',  image: 'assets/images/feature/blog-detail.jpg', type: 'link' },
	//       { path: '/categories/all', title: 'category-left-sidebar', image: 'assets/images/feature/category-page.jpg', type: 'link' },
	//       { path: '/categories/right-sidebar/collection/all', title: 'category-right-sidebar', image: 'assets/images/feature/category-page(right).jpg', type: 'link' },
	//       { path: '/categories/no-sidebar/collection/all', title: 'category-no-sidebar', image: 'assets/images/feature/category-page(no-sidebar).jpg', type: 'link' }
	//     ]
	// },
	{
		title: 'Computers',  type: 'sub', children: [
				{ path: '/categories/Laptop', title: 'Laptops',type: 'link' },
				{ path: '/categories/Monitor', title: 'Desktops',type: 'link' }
	    ]
	},
	{
		title: 'Camera',  type: 'link', path: '/categories/Laptop'
	},
	{
		title: 'Offers',  type: 'link', path: '/'
	},
	{
		title: 'B2B',  type: 'link', path: '/'
	},
	// {
	// 	title: 'pages', type: 'sub', children: [
	//       { path: '/pages/about-us', title: 'about-us', type: 'link' },          
	//       { path: '/pages/lookbook', title: 'lookbook', type: 'link' },         
	//       { path: '/pages/typography', title: 'Typography', type: 'link' }, 
	//       { 
	//       	title: 'Portfolio',  type: 'sub', children: [
	// 	      	{ path: '/pages/grid/two/column', title: 'Portfolio-2-Grid',  type: 'link' },
	// 	      	{ path: '/pages/grid/three/column', title: 'Portfolio-3-Grid',  type: 'link' },
	// 	      	{ path: '/pages/grid/four/column', title: 'Portfolio-4-Grid',  type: 'link' },
	// 	      	{ path: '/pages/grid/two/masonary', title: 'Masonary-2-Grid',  type: 'link' },
	// 	      	{ path: '/pages/grid/three/masonary', title: 'Masonary-3-Grid',  type: 'link' },
	// 	      	{ path: '/pages/grid/four/masonary', title: 'Masonary-4-Grid',  type: 'link' },
	// 	      	{ path: '/pages/fullwidth/masonary', title: 'Masonary-Fullwidth',  type: 'link' }
	//       	]
	//       },         
	//       { path: '/pages/dashboard', title: 'dashboard', type: 'link' },  
	//       { path: '/pages/cart', title: 'cart', type: 'link' },  
	//       { path: '/pages/wishlist', title: 'wishlist', type: 'link' },    
	//       { path: '/pages/compare', title: 'compare', type: 'link' },  
	//       { path: '/pages/checkout', title: 'checkout', type: 'link' },  
	//       { path: '/pages/login', title: 'login', type: 'link' },        
	//       { path: '/pages/register', title: 'register', type: 'link' },        
	//       { path: '/pages/forgetpassword', title: 'forget-password', type: 'link' },  
	//       { path: '/pages/search', title: 'search', type: 'link' },        
	//       { path: '/pages/collection', title: 'collection', type: 'link' },  
	//       { path: '/pages/order-success', title: 'order-success', type: 'link' },  
	//       { path: '/pages/contact', title: 'contact', type: 'link' },  
	//       { path: '/pages/faq', title: 'FAQ', type: 'link' },  
	//       { path: '/pages/404', title: '404', type: 'link'}        
	//     ]
	// },
	{
		title: 'shop', type: 'sub', megaMenu: true, megaMenuType: 'large', children: [
	      { 
	      	title: 'mens-fashion',  type: 'link', children: [
		      	{ path: '/categories/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'top',  type: 'link' },
		      	{ path: '/categories/all', title: 'bottom',  type: 'link' },
		      	{ path: '/categories/all', title: 'ethic-wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'shirts',  type: 'link' }
	      	]
	      },
	      { 
	      	title: 'women-fashion',  type: 'link', children: [
		      	{ path: '/categories/all', title: 'dresses',  type: 'link' },
		      	{ path: '/categories/all', title: 'skirts',  type: 'link' },
		      	{ path: '/categories/all', title: 'westarn-wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'ethic-wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'bottom-wear',  type: 'link' }
	      	]
	      },
	      { 
	      	title: 'kids-fashion',  type: 'link', children: [
		      	{ path: '/categories/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'ethic-wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'top',  type: 'link' },
		      	{ path: '/categories/all', title: 'bottom-wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'ethic-wear',  type: 'link' }
	      	]
	      },
	      { 
	      	title: 'accessories',  type: 'link', children: [
		      	{ path: '/categories/all', title: 'fashion-jewellery',  type: 'link' },
		      	{ path: '/categories/all', title: 'caps-and-hats',  type: 'link' },
		      	{ path: '/categories/all', title: 'precious-jewellery',  type: 'link' },
		      	{ path: '/categories/all', title: 'necklaces',  type: 'link' },
		      	{ path: '/categories/all', title: 'earrings',  type: 'link' },
		      	{ path: '/categories/all', title: 'rings-wrist-wear',  type: 'link' }
	      	]
	      },
	      { 
	      	title: 'men-accessories',  type: 'link', children: [
		      	{ path: '/categories/all', title: 'ties',  type: 'link' },
		      	{ path: '/categories/all', title: 'cufflinks',  type: 'link' },
		      	{ path: '/categories/all', title: 'pockets-squares',  type: 'link' },
		      	{ path: '/categories/all', title: 'helmets',  type: 'link' },
		      	{ path: '/categories/all', title: 'scarves',  type: 'link' },
		      	{ path: '/categories/all', title: 'phone-cases',  type: 'link' }
	      	]
	      },
	    ]
	},
]
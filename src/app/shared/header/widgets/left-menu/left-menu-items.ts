// Menu
export interface Menu {
  path?: string;
  title?: string;
  type?: string;
  megaMenu?: boolean;
  children?: Menu[];
}

export const MENUITEMS: Menu[] = [
	{
		title: 'clothing', type: 'sub', megaMenu: true, children: [
	      { 
	      	title: 'mens fashion',  type: 'link', children: [
		      	{ path: '/categories/all', title: 'sports wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'top',  type: 'link' },
		      	{ path: '/categories/all', title: 'bottom',  type: 'link' },
		      	{ path: '/categories/all', title: 'ethic wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'sports wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'shirts',  type: 'link' },
		        { path: '/categories/all', title: 'bottom',  type: 'link' },
		      	{ path: '/categories/all', title: 'ethic wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'sports wear',  type: 'link' }
	      	]
	      },
	      { 
	      	title: 'women fashion',  type: 'link', children: [
		      	{ path: '/categories/all', title: 'dresses',  type: 'link' },
		      	{ path: '/categories/all', title: 'skirts',  type: 'link' },
		      	{ path: '/categories/all', title: 'westarn wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'ethic wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'bottom',  type: 'link' },
		      	{ path: '/categories/all', title: 'ethic wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'sports wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'sports wear',  type: 'link' },
		      	{ path: '/categories/all', title: 'bottom wear',  type: 'link' }
	      	]
	      },
	    ]
	},
	{
		title: 'bags', type: 'sub', children: [
		  { path: '/categories/all', title: 'shopper bags', type: 'link' },
		  { path: '/categories/all', title: 'laptop bags', type: 'link' },
		  { path: '/categories/all', title: 'clutches', type: 'link' },
		  { 
		  	path: '/categories/all', title: 'purses', type: 'link', children: [
		      	{ path: '/categories/all', title: 'purses',  type: 'link' },
		      	{ path: '/categories/all', title: 'wallets',  type: 'link' },
		      	{ path: '/categories/all', title: 'leathers',  type: 'link' },
		      	{ path: '/categories/all', title: 'satchels',  type: 'link' }
	      	]
		  },
	    ]
	},
	{
		title: 'footwear', type: 'sub', children: [
		  { path: '/categories/all', title: 'sport shoes', type: 'link' },
		  { path: '/categories/all', title: 'formal shoes', type: 'link' },
		  { path: '/categories/all', title: 'casual shoes', type: 'link' }
		]
	},
	{
		path: '/categories/all', title: 'watches', type: 'link'
	},
	{
		title: 'Accessories', type: 'sub', children: [
		  { path: '/categories/all', title: 'fashion jewellery', type: 'link' },
		  { path: '/categories/all', title: 'caps and hats', type: 'link' },
		  { path: '/categories/all', title: 'precious jewellery', type: 'link' },
		  { 
		  	path: '/categories/all', title: 'more..', type: 'link', children: [
		      	{ path: '/categories/all', title: 'necklaces',  type: 'link' },
		      	{ path: '/categories/all', title: 'earrings',  type: 'link' },
		      	{ path: '/categories/all', title: 'rings & wrist wear',  type: 'link' },
		      	{ 
		      		path: '/categories/all', title: 'more...',  type: 'link', children: [
				      	{ path: '/categories/all', title: 'ties',  type: 'link' },
				      	{ path: '/categories/all', title: 'cufflinks',  type: 'link' },
				      	{ path: '/categories/all', title: 'pockets squares',  type: 'link' },
				      	{ path: '/categories/all', title: 'helmets',  type: 'link' },
				      	{ path: '/categories/all', title: 'scarves',  type: 'link' },
				      	{ 
				      		path: '/categories/all', title: 'more...',  type: 'link', children: [
						      	{ path: '/categories/all', title: 'accessory gift sets',  type: 'link' },
						      	{ path: '/categories/all', title: 'travel accessories',  type: 'link' },
						      	{ path: '/categories/all', title: 'phone cases',  type: 'link' }
				      		]
				      	},
				    ]
		      	}
	      	]
		  },
	    ]
	},
	{
		path: '/categories/all', title: 'house of design', type: 'link'
	},
	{
		title: 'beauty & personal care', type: 'sub', children: [
		  { path: '/categories/all', title: 'makeup', type: 'link' },
		  { path: '/categories/all', title: 'skincare', type: 'link' },
		  { path: '/categories/all', title: 'premium beaty', type: 'link' },
		  { 
		  	path: '/categories/all', title: 'more..', type: 'link', children: [
		      	{ path: '/categories/all', title: 'fragrances',  type: 'link' },
		      	{ path: '/categories/all', title: 'luxury beauty',  type: 'link' },
		      	{ path: '/categories/all', title: 'hair care',  type: 'link' },
		      	{ path: '/categories/all', title: 'tools & brushes',  type: 'link' }
	      	]
		  },
	    ]
	},
	{
		path: '/categories/all', title: 'home & decor', type: 'link'
	},
	{
		path: '/categories/all', title: 'kitchen', type: 'link'
	},
]
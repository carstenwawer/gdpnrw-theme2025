<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */
 
$context = Timber::context();

switch_to_blog( BLOG_ID_CURRENT_SITE );

global $params;

$timber_post = Timber::query_post( array( 
	'name' => $params['slug']
 ) );
$context['post'] = $timber_post;
$context['external_post'] = Timber::compile( 'partial/nrw-article.twig', $context );


restore_current_blog();

if ( post_password_required( $timber_post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	if( $timber_post->ID ){
		Timber::render( array( 'nrw-presse-' . $timber_post->ID . '.twig', 'nrw-presse-' . $timber_post->post_type . '.twig', 'nrw-presse.twig' ), $context );
	}else{
		Timber::render('404.twig', $context );
	}
	
}
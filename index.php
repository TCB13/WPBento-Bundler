<h1>Welcome to WPBento Bundler</h1>
<p>This is a blank/barebones example theme from WPBento-Bundler.</p>
<p>Lean how to build your WordPress themes at <a href="https://developer.wordpress.org/themes/basics/">https://developer.wordpress.org/themes/basics</a>.</p>

<?php
$the_query = new WP_Query([
    'posts_per_page' => 5,
]);
?>

<?php if ($the_query->have_posts()) : ?>
    <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>
        <?php the_title(); ?>
        <?php the_excerpt(); ?>
    <?php endwhile; ?>
    <?php wp_reset_postdata(); ?>
<?php else : ?>
    <p><?php __('No posts to show.'); ?></p>
<?php endif; ?>

<?php

/**
 * @file
 * Entity-pager.tpl.php.
 *
 * Adds an Entity Pager:
 * E.g.
 *    < prev  All  next >
 *          5 of 12
 *
 * The list of items are presented next to each other in a usable way
 * (see e.g. above) using minimalist amount of CSS see: entity_pager.css.
 *
 * Default variables:
 *
 * $links: An array of links to render, keyed by their class.
 *
 * $links['prev'] : link to previous node.
 * $links['all_link'] : link to All listing group of records.
 * $links['next'] : link to next node in the sequence.
 * $links['count'] : count of number of nodes in the group.
 */

?>
<ul class="entity_pager count_word_<?php print $count_word ?>">
  <?php foreach ($links as $key => $link): ?>
    <li class="entity_pager_<?php print $key; ?>">
      <?php print $link ?>
    </li>
  <?php endforeach; ?>
</ul>

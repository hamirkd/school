package com.testspring.controllers;

import javax.validation.Valid;

import com.testspring.models.Cour;
import com.testspring.services.CourService;
import com.testspring.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cours")
@CrossOrigin("*")
public class CourController {

	@Autowired
	CourService courService;

	@Autowired
	UserService userService;

	@GetMapping("")
	public List<Cour> getAllCours() {
		return courService.listeDeTousLesCoursPublic();
	}
	/*
	 * @GetMapping("/users/{user}") public List<Cour>
	 * getMyCours(@PathVariable("user") User user) { return
	 * courService.listeDeSesCours(userService.find); }
	 */

	@PostMapping("")
	public Cour createCour(@Valid @RequestBody Cour cour) {
		cour.getUser().setCours(null);
		Cour courData = courService.creerCour(cour);
		System.out.println(userService.addCour(courData));
		return courData;
	}

	@GetMapping(value = "/{id}")
	public Cour getCourById(@PathVariable("id") String id) {
		return courService.rechercherCourId(id);
	}

	@GetMapping(value = "/login/{login}")
	public List<Cour> getCourByLogin(@PathVariable("login") String login) {
		return userService.getUserByLogin(login).getCours();
	}

	@PutMapping(value = "/{id}")
	public Cour updateCour(@PathVariable("id") String id, @Valid @RequestBody Cour cour) {
		Cour o = courService.modifierCour(id, cour);
		userService.modifyCour(o);
		return o;
	}

	@DeleteMapping(value = "/{id}")
	public Object deleteCour(@PathVariable("id") String id) {
		return userService.removeCour(courService.supprimerCour(id));
	}

	@GetMapping(value = "/titre/{titre}")
	public List<Cour> getCourByTitre(@PathVariable("titre") String titre) {
		return courService.findCours(titre);
	}

	@GetMapping("/sort/{column}/{order}")
	public List<Cour> getAllCoursSort(@PathVariable("column") String column, @PathVariable("order") boolean order) {
		Sort sortBy;
		if (order)
			sortBy = new Sort(Sort.Direction.ASC, column);
		else
			sortBy = new Sort(Sort.Direction.DESC, column);
		return courService.listCoursPublicSort(sortBy);
	}
}
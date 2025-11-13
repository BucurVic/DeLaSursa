package org.example.delasursa.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.example.delasursa.model.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Arrays;
import java.util.Date;
import java.security.Key;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret.key}")
    private String JWT_SECRET;

    private final long expirationMs = 3600000;

    public String generateToken(Authentication authentication) {
        CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();
        String email = userPrincipal.getEmail();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + expirationMs);
        Set<String> authorities = authentication.getAuthorities().stream()
                .map(grantedAuthority -> grantedAuthority.getAuthority())
                .map(a -> a.split("_")[1])
                .collect(Collectors.toSet());
        Object obj = authentication.getPrincipal();

        String firstName = "";
        String lastName = "";
        Integer id = null;
        if(obj instanceof CustomUserDetails) {
            id = ((CustomUserDetails) obj).getUserId();
        }
        return Jwts.builder()
                .subject(email)
                .claim("id", id != null ? id.toString() : "" )
                .claim("authorities", authorities)
                .claim("firstName", firstName)
                .claim("lastName", lastName)
                .issuedAt(new Date())
                .expiration(expireDate)
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(JWT_SECRET));
    }
    public String getUsername(String token){

        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public UUID getId(String token){
        Claims claims = extractAllClaims(token);
        return UUID.fromString(claims.get("id").toString());
    }

    public Set<Role> getRoles(String token){
        Claims claims = extractAllClaims(token);
        String roles =  claims.get("authorities").toString();

        return Arrays.stream(roles.split(","))
                .map(Role::new)
                .collect(Collectors.toSet());
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token){
        Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parse(token);
        return true;

    }
}
